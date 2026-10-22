import { describe, expect, test } from "bun:test";
import RootLayout from "../app/layout";
import HomePage from "../app/page";
import TopNav from "../components/nav/TopNav";

type ElementLike = { type?: unknown; props?: { children?: unknown } };

/** Counts how many times `TopNav` appears in a React element tree. */
function countTopNav(node: unknown): number {
  if (node === null || node === undefined) return 0;
  if (typeof node === "boolean" || typeof node === "string" || typeof node === "number") return 0;
  if (Array.isArray(node)) return node.reduce<number>((n, child) => n + countTopNav(child), 0);
  if (typeof node !== "object") return 0;

  const element = node as ElementLike;
  const count = element.type === TopNav ? 1 : 0;
  return count + countTopNav(element.props?.children);
}

describe("app shell", () => {
  test("the home page composes to exactly one navigation bar", () => {
    const tree = RootLayout({ children: HomePage() });
    expect(countTopNav(tree)).toBe(1);
  });

  test("the layout owns the navigation bar", () => {
    const tree = RootLayout({ children: null });
    expect(countTopNav(tree)).toBe(1);
  });
});
