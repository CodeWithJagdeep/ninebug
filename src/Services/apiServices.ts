import { base } from "./api";

class _ApiServices<T> {
  public url: string;
  public data: T;

  constructor(url: string, data: T) {
    this.url = url;
    this.data = data;
  }

  async _handlePostRequest(isFileUpload = false) {
    try {
      const request = await base.post(this.url, this.data, {
        headers: this._getHeaders(
          undefined,
          undefined,
          isFileUpload ? "" : "application/json"
        ),
      });
      return request.data;
    } catch (err) {
      console.error("POST Request Error:", err);
      throw err;
    }
  }

  async _handlePutRequest(isFileUpload = false) {
    try {
      const request = await base.put(this.url, this.data, {
        headers: this._getHeaders(
          undefined,
          undefined,
          isFileUpload ? "" : "application/json"
        ),
      });
      return request.data;
    } catch (err) {
      console.error("PUT Request Error:", err);
      throw err;
    }
  }

  async _handleGetRequest(isFileUpload = false) {
    try {
      const request = await base.get(this.url, {
        headers: this._getHeaders(
          undefined,
          undefined,
          isFileUpload ? "" : "application/json"
        ),
      });
      return request.data;
    } catch (error) {
      console.error("GET Request Error:", error);
      return { error: "Failed to connect to the server" };
    }
  }

  async _handleDeleteRequest(isFileUpload = false) {
    try {
      const request = await base.delete(this.url, {
        headers: this._getHeaders(
          undefined,
          undefined,
          isFileUpload ? "" : "application/json"
        ),
        // data: this.data, // axios requires `data` inside config for DELETE
      });
      return request.data;
    } catch (err) {
      console.error("DELETE Request Error:", err);
      throw err;
    }
  }

  private _getHeaders(
    apiKey: string = "ca3cb8dd61412cbf33ad949a1c38e33e1263574a23d7092be753e21ed7f5c3c4",
    apiSecret: string = "0eb2c4cc4ae19306ecd9df3a5ce7b5beaf032425867274f653dc83b2f5e2cb54a91d63bea698ecf43a2dc4cd79000bf1b1c1b730d77a4b5562d32195de293325",
    contentType = "application/json"
  ) {
    const baseHeaders: Record<string, string> = {
      Accept: "application/json",
      // API versioning
      "X-API-Version": "1.0.0",

      // Skip browser warnings
      "ngrok-skip-browser-warning": "true",

      // Performance hints
      "X-DNS-Prefetch-Control": "off",
      "X-Download-Options": "noopen",
    };

    if (contentType) {
      baseHeaders["Content-Type"] = contentType;
    }

    // Add authentication headers if provided
    if (apiKey) {
      Object.assign(baseHeaders, {
        "X-API-KEY": apiKey,
        ...(apiSecret && { "X-API-SECRET": apiSecret }),
      });
    }

    return baseHeaders;
  }
}

export default _ApiServices;
