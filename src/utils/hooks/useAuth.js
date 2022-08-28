import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const { v4: uuidv4 } = require("uuid");
const crypto = require("crypto");
const sign = require("jsonwebtoken").sign;
const queryEncode = require("querystring").encode;

export default function useAuth(withParam, body = null) {
  const [token, setToken] = useState(null);
  const userAuth = useSelector((state) => state.user.auth);

  useEffect(() => {
    if (!userAuth.apiKey || !userAuth.secret) {
      return "Bearer null";
    }

    if (withParam) {
      const query = queryEncode(body);
      const hash = crypto.createHash("sha512");
      const queryHash = hash.update(query, "utf-8").digest("hex");

      const payload = {
        access_key: userAuth.apiKey,
        nonce: uuidv4.uuid(),
        query_hash: queryHash,
        query_hash_alg: "SHA512",
      };

      setToken(sign(payload, userAuth.secret));
    } else {
      const payload = {
        access_key: userAuth.apiKey,
        nonce: uuidv4.uuid(),
      };

      setToken(sign(payload, userAuth.secret));
    }

    return `Bearer ${token}`;
  }, []);

  return `Bearer ${token}`;
}
