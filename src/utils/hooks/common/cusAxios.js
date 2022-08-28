import axios from "axios";

const { v4: uuidv4 } = require("uuid");
const crypto = require("crypto");
const sign = require("jsonwebtoken").sign;
const queryEncode = require("querystring").encode;

function getPayload(key, body) {
  let payload = null;

  if (body) {
    const query = queryEncode(body);
    const hash = crypto.createHash("sha512");
    const queryHash = hash.update(query, "utf-8").digest("hex");

    console.log(key);

    payload = {
      access_key: key.apiKey,
      nonce: uuidv4(),
      query_hash: queryHash,
      query_hash_alg: "SHA512",
    };
  } else {
    console.log(key);

    payload = {
      access_key: key.apiKey,
      nonce: uuidv4(),
    };
  }

  const token = sign(payload, key.secret);

  return `Bearer ${token}`;
}

export function cusAxios({ type, url, key, body = null }) {
  if (!key.apiKey || !key.secret) {
    return null;
  }

  async function initAxios() {
    const response = await axios.get("https://api.upbit.com/v1" + url, {
      headers: {
        Authorization: getPayload(key, body),
        "Content-Type": `application/json`,
        "Access-Control-Allow-Origin": "*",
      },
      json: {},
    });

    console.log(response);
  }

  return initAxios();
}
