import { test, expect } from "@playwright/test";

test("API Login - Valid Credentials", async ({ request }) => {
  const response = await request.post("http://localhost:5000/login", {
    data: {
      username: "admin",
      password: "admin123"
    }
  });

  expect(response.status()).toBe(200);
});
