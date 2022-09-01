import axios from "axios";
import { request } from "https";

const { v4: uuidv4 } = require("uuid");
const crypto = require("crypto");
const sign = require("jsonwebtoken").sign;
const queryEncode = require("querystring").encode;

export function getToken(key, body = null) {
  let payload = null;

  if (body) {
    const query = queryEncode(body);

    const hash = crypto.createHash("sha512");
    const queryHash = hash.update(query, "utf-8").digest("hex");

    payload = {
      access_key: key.apiKey,
      nonce: uuidv4(),
      query_hash: queryHash,
      query_hash_alg: "SHA512",
    };
  } else {
    payload = {
      access_key: key.apiKey,
      nonce: uuidv4(),
    };
  }

  const token = !key.apiKey || !key.secret ? null : sign(payload, key.secret);

  return `Bearer ${token}`;
}

export function cusAxios({ type, url, key, body = null }) {
  if (!key.apiKey || !key.secret) {
    return null;
  }

  const options = {
    method: type,
    url: "/api" + url,
    headers: {
      Authorization: getToken(key, body),
      Accept: `application/json`,
    },
  };

  axios
    .request(options)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.error(error);
    });

  return null;
}

export function cusMyWallet({ key }) {
  if (!key.apiKey || !key.secret) {
    return null;
  }

  async function Call() {
    const response = await axios.get("/api/v1/accounts", {
      headers: {
        Authorization: getToken(key),
        Accept: `application/json`,
      },
    });

    return response;
  }

  Call().then(({ data }) => {
    return data;
  });
}
