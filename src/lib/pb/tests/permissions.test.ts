import { test, expect, describe } from "vitest";
import { impersonateTenant } from "./test-pb-client";



// test user account with no permissions
describe("test user with no permissions", async() => {
const pb = await impersonateTenant("0r72129wa52fo63");
  test("list shops owned", async () => {
      const shops = await pb.from("property_shops").getList(1, 5);
      expect(shops.items.length).toBe(0);
  });
  test("list fellow users", async () => {
      const shops = await pb.from("property_user").getList(1, 5);
      expect(shops.items.length).toBe(1);
  });
  test("list staff_list", async () => {
      const shops = await pb.from("property_staff_list").getList(1, 5);
      expect(shops.items.length).toBe(0);
  });
});

describe("test user with tenant permissions", async() => {
const pb = await impersonateTenant("x1ay9b4y7756l2y");
  test("list shops owned", async () => {
      const shops = await pb.from("property_shops").getList(1, 5);
      expect(shops.items.length).toBe(2);
  });
  test("list fellow users", async () => {
      const shops = await pb.from("property_user").getList(1, 5);
      expect(shops.items.length).toBe(1);
  });
  test("list staff_list", async () => {
      const shops = await pb.from("property_staff_list").getList(1, 5);
      expect(shops.items.length).toBe(0);
  });
});
