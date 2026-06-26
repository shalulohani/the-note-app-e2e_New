import { test, expect } from "@playwright/test";

test("API Login - Valid Credentials", async ({ request }) => {
  const response = await request.post("http://localhost:5000/login", {
    data: {
      username: "admin",
      password: "admin123"
    }
  });

  expect(response.ok()).toBeTruthy();

  const body = await response.json();
  expect(body.message).toBe("Login successful");
});
