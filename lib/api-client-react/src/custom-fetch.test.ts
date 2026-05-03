import { beforeEach, describe, expect, it, vi } from "vitest";
import {
  ApiError,
  ResponseParseError,
  customFetch,
  setAuthTokenGetter,
  setBaseUrl,
} from "./custom-fetch";

function jsonOk(data: unknown) {
  return new Response(JSON.stringify(data), {
    status: 200,
    headers: { "content-type": "application/json" },
  });
}

describe("customFetch", () => {
  beforeEach(() => {
    setBaseUrl(null);
    setAuthTokenGetter(null);
    vi.restoreAllMocks();
  });

  it("prepends setBaseUrl to relative paths", async () => {
    setBaseUrl("https://api.example.com/");
    const fetchMock = vi.fn().mockResolvedValue(jsonOk({ hello: true }));
    vi.stubGlobal("fetch", fetchMock);

    await customFetch("/v1/ping", { responseType: "json" });

    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [url] = fetchMock.mock.calls[0];
    expect(url).toBe("https://api.example.com/v1/ping");
  });

  it("strips trailing slashes from base URL", async () => {
    setBaseUrl("https://api.example.com///");
    const fetchMock = vi.fn().mockResolvedValue(jsonOk({}));
    vi.stubGlobal("fetch", fetchMock);

    await customFetch("/x");

    const [url] = fetchMock.mock.calls[0];
    expect(url).toBe("https://api.example.com/x");
  });

  it("does not prepend base to absolute http(s) URLs", async () => {
    setBaseUrl("https://api.example.com");
    const fetchMock = vi.fn().mockResolvedValue(jsonOk({}));
    vi.stubGlobal("fetch", fetchMock);

    await customFetch("https://other.example.com/z");

    const [url] = fetchMock.mock.calls[0];
    expect(url).toBe("https://other.example.com/z");
  });

  it("rejects GET requests with a body", async () => {
    await expect(
      customFetch("/x", { method: "GET", body: "{}" }),
    ).rejects.toThrow(/GET requests cannot have a body/);
  });

  it("parses JSON success bodies", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(jsonOk({ value: 42 })),
    );

    const data = await customFetch<{ value: number }>("/ok", {
      responseType: "json",
    });

    expect(data).toEqual({ value: 42 });
  });

  it("throws ApiError on non-OK responses", async () => {
    const body = JSON.stringify({ detail: "Missing thing" });
    vi.stubGlobal(
      "fetch",
      vi.fn().mockImplementation(
        () =>
          new Response(body, {
            status: 404,
            statusText: "Not Found",
            headers: { "content-type": "application/json" },
          }),
      ),
    );

    try {
      await customFetch("/missing");
      expect.fail("expected ApiError");
    } catch (e) {
      expect(e).toBeInstanceOf(ApiError);
      expect((e as ApiError).status).toBe(404);
      expect((e as ApiError).message).toContain("Missing thing");
    }
  });

  it("adds Bearer token when auth getter returns a string", async () => {
    setAuthTokenGetter(() => "secret-token");
    const fetchMock = vi.fn().mockResolvedValue(jsonOk({}));
    vi.stubGlobal("fetch", fetchMock);

    await customFetch("/secure", { responseType: "json" });

    const init = fetchMock.mock.calls[0][1] as RequestInit;
    const headers = new Headers(init.headers);
    expect(headers.get("authorization")).toBe("Bearer secret-token");
  });

  it("does not override explicit Authorization header", async () => {
    setAuthTokenGetter(() => "ignored");
    const fetchMock = vi.fn().mockResolvedValue(jsonOk({}));
    vi.stubGlobal("fetch", fetchMock);

    await customFetch("/secure", {
      responseType: "json",
      headers: { Authorization: "Bearer explicit" },
    });

    const init = fetchMock.mock.calls[0][1] as RequestInit;
    const headers = new Headers(init.headers);
    expect(headers.get("authorization")).toBe("Bearer explicit");
  });

  it("sets Content-Type for JSON-looking string bodies when omitted", async () => {
    const fetchMock = vi.fn().mockResolvedValue(jsonOk({ ok: true }));
    vi.stubGlobal("fetch", fetchMock);

    await customFetch("/post", {
      method: "POST",
      body: '{"a":1}',
      responseType: "json",
    });

    const init = fetchMock.mock.calls[0][1] as RequestInit;
    const headers = new Headers(init.headers);
    expect(headers.get("content-type")).toMatch(/application\/json/);
  });

  it("returns text when responseType is text", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(
        new Response("plain", {
          status: 200,
          headers: { "content-type": "text/plain" },
        }),
      ),
    );

    const text = await customFetch("/doc", { responseType: "text" });
    expect(text).toBe("plain");
  });

  it("returns null for 204 responses with JSON responseType", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(new Response(null, { status: 204 })),
    );

    const data = await customFetch("/gone", { responseType: "json" });
    expect(data).toBeNull();
  });

  it("throws ResponseParseError when JSON success body is invalid", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(
        new Response("not-json", {
          status: 200,
          headers: { "content-type": "application/json" },
        }),
      ),
    );

    await expect(
      customFetch("/bad-json", { responseType: "json" }),
    ).rejects.toBeInstanceOf(ResponseParseError);
  });
});

describe("ApiError", () => {
  const req = { method: "GET", url: "/x" };

  function httpResponse(status: number, statusText: string) {
    return new Response(null, { status, statusText });
  }

  it("formats message from detail field", () => {
    const err = new ApiError(httpResponse(404, "Not Found"), { detail: "Nope" }, req);
    expect(err.message).toContain("404");
    expect(err.message).toContain("Nope");
    expect(err.status).toBe(404);
  });

  it("formats message from title and detail", () => {
    const err = new ApiError(
      httpResponse(400, "Bad Request"),
      { title: "Bad", detail: "Worse" },
      req,
    );
    expect(err.message).toContain("Bad");
    expect(err.message).toContain("Worse");
    expect(err.message).toContain("—");
  });

  it("prefers message over title when detail is absent", () => {
    const err = new ApiError(
      httpResponse(422, "Unprocessable"),
      { title: "T", message: "M" },
      req,
    );
    expect(err.message).toContain("M");
  });

  it("formats string error bodies", () => {
    const err = new ApiError(httpResponse(500, "Err"), "  boom  ", req);
    expect(err.message).toContain("boom");
  });

  it("uses HTTP prefix only when string body is whitespace", () => {
    const err = new ApiError(httpResponse(400, "Bad"), "   \n", req);
    expect(err.message).toBe("HTTP 400 Bad");
  });
});
