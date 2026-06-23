import { test, expect } from "@playwright/test";

test("API Login - Valid Credentials", async ({ request }) => {
  const response = await request.post("http://localhost:4000/login", {
    data: {
      email: "test@example.com",
      password: "password123"
    }
  });

  expect(response.status()).toBe(200);
});
