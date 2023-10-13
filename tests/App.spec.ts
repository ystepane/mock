import { test, expect } from "@playwright/test";

/**
  The general shapes of tests in Playwright Test are:
    1. Navigate to a URL
    2. Interact with the page
    3. Assert something about the page against your expectations
  Look for this pattern in the tests below!
 */

// If you needed to do something before every test case...
test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:8000/");
  // ... you'd put it here.
  // TODO: Is there something we need to do before every test case to avoid repeating code?
});

/**
 * Don't worry about the "async" yet. We'll cover it in more detail
 * for the next sprint. For now, just think about "await" as something
 * you put before parts of your test that might take time to run,
 * like any interaction with the page.
 */
test("on page load, i see an input bar", async ({ page }) => {
  // Notice: http, not https! Our front-end is not set up for HTTPs.
  await expect(page.getByLabel("Command input")).toBeVisible();
});

test("after I type into the input box, its text changes", async ({ page }) => {
  // Step 1: Navigate to a URL

  // Step 2: Interact with the page
  // Locate the element you are looking for
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("Awesome command");

  // Step 3: Assert something about the page
  // Assertions are done by using the expect() function
  const mock_input = `Awesome command`;
  await expect(page.getByLabel("Command input")).toHaveValue(mock_input);
});

test("on page load, i see a button", async ({ page }) => {
  await expect(
    page.getByRole("button", { name: "Submitted 0 times" })
  ).toBeVisible();
});

test("after I click the button, its label increments", async ({ page }) => {
  await expect(
    page.getByRole("button", { name: "Submitted 0 times" })
  ).toBeVisible();
  await page.getByRole("button", { name: "Submitted 0 times" }).click();
  await page.getByRole("button", { name: "Submitted 1 times" }).click();
  await page.getByRole("button", { name: "Submitted 2 times" }).click();
  await page.getByRole("button", { name: "Submitted 3 times" }).click();
  await expect(
    page.getByRole("button", { name: "Submitted 4 times" })
  ).toBeVisible();
});

test("has title", async ({ page }) => {
  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Mock/);
});

test("supports empty submit", async ({ page }) => {
  await page.getByRole("button", { name: "Submitted 0 times" }).click();
  await expect(
    page
      .locator("table")
      .filter({ hasText: "Output:Error:badcommand.isnotarealcommand" })
  ).toBeVisible();
});
//  <table class="centered-table">…</table> aka getByRole('table').first()
//    <table class="centered-table">…</table> aka locator('table').filter({ hasText: 'Output:Error:badcommand.isnotarealcommand' })
test("supports mode switching", async ({ page }) => {
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("mode");
  await page.getByRole("button", { name: "Submitted 0 times" }).click();
  await expect(
    page.locator("table").filter({ hasText: "Output:Modeswitchedtoverbose" })
  ).toBeVisible();
});

test("multiple submits", async ({ page }) => {
  await page.goto("http://localhost:8000/");
  //first submit
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("mode");
  await page.getByRole("button", { name: "Submitted 0 times" }).click();
  await expect(
    page.locator("table").filter({ hasText: "Output:Modeswitchedtoverbose" })
  ).toBeVisible();
  // second submit
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("mode");
  await page.getByRole("button", { name: "Submitted 1 times" }).click();
  await expect(
    page.locator("table").filter({ hasText: "Output:Modeswitchedtobrief" })
  ).toBeVisible();
});
// loading the invalid file
test("failing invalid load", async ({ page }) => {
  //first submit
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load_file badfile");
  await page.getByRole("button", { name: "Submitted 0 times" }).click();
  await expect(
    page.locator("table").filter({ hasText: "Output:Couldnotfindbadfile" })
  ).toBeVisible();
});
// loading a good file
test("good single load", async ({ page }) => {
  //first submit
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load_file way");
  await page.getByRole("button", { name: "Submitted 0 times" }).click();
  await expect(
    page
      .locator("table")
      .filter({ hasText: "Output:load_fileofwaysuccessful!" })
  ).toBeVisible();
});
// loading twice
test("double load", async ({ page }) => {
  //first submit
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load_file way");
  await page.getByRole("button", { name: "Submitted 0 times" }).click();
  await expect(
    page
      .locator("table")
      .filter({ hasText: "Output:load_fileofwaysuccessful!" })
  ).toBeVisible();
  // second load
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load_file fire");
  await page.getByRole("button", { name: "Submitted 1 times" }).click();
  await expect(
    page
      .locator("table")
      .filter({ hasText: "Output:load_fileoffiresuccessful!" })
  ).toBeVisible();
});
// loading one good and one bad file
test("double invalid load", async ({ page }) => {
  //first submit
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load_file way");
  await page.getByRole("button", { name: "Submitted 0 times" }).click();
  await expect(
    page
      .locator("table")
      .filter({ hasText: "Output:load_fileofwaysuccessful!" })
  ).toBeVisible();
  // second load
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load_file badfile");
  await page.getByRole("button", { name: "Submitted 1 times" }).click();
  await expect(
    page.locator("table").filter({ hasText: "Output:Couldnotfindbadfile" })
  ).toBeVisible();
});

// view without load
test("failing invalid view", async ({ page }) => {
  //first submit
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("view");
  await page.getByRole("button", { name: "Submitted 0 times" }).click();
  await expect(
    page.locator("table").filter({ hasText: "Output:Error:nofileswereloaded." })
  ).toBeVisible();
});
// view with a good load
test("good view", async ({ page }) => {
  //load
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load_file way");
  await page.getByRole("button", { name: "Submitted 0 times" }).click();
  await expect(
    page
      .locator("table")
      .filter({ hasText: "Output:load_fileofwaysuccessful!" })
  ).toBeVisible();
  //view
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("view");
  await page.getByRole("button", { name: "Submitted 1 times" }).click();
  await expect(
    page.locator("table").filter({ hasText: "Output:Successfulview!" })
  ).toBeVisible();
  await expect(
    page.locator("table").filter({ hasText: "12345" })
  ).toBeVisible();
  await expect(
    page.locator("table").filter({ hasText: "Iwantitthatway" })
  ).toBeVisible();
});
// view with a bad load
test("failing view with bad load", async ({ page }) => {
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load_file badfile");
  await page.getByRole("button", { name: "Submitted 0 times" }).click();
  await expect(
    page.locator("table").filter({ hasText: "Output:Couldnotfindbadfile" })
  ).toBeVisible(); //first submit
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("view");
  await page.getByRole("button", { name: "Submitted 1 times" }).click();
  await expect(
    page.locator("table").filter({ hasText: "Output:Error:nofileswereloaded." })
  ).toBeVisible();
});
// view with >1 arg
test("failing view with many args", async ({ page }) => {
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load_file badfile");
  await page.getByRole("button", { name: "Submitted 0 times" }).click();
  await expect(
    page.locator("table").filter({ hasText: "Output:Couldnotfindbadfile" })
  ).toBeVisible(); //first submit
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("view file");
  await page.getByRole("button", { name: "Submitted 1 times" }).click();
  await expect(
    page.locator("table").filter({
      hasText: "Output:Error:viewonlytakesin1argument.Takecs32again!",
    })
  ).toBeVisible();
});
// view with two good loads & view twice diff things
test("good view twice", async ({ page }) => {
  //load
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load_file way");
  await page.getByRole("button", { name: "Submitted 0 times" }).click();
  await expect(
    page
      .locator("table")
      .filter({ hasText: "Output:load_fileofwaysuccessful!" })
  ).toBeVisible();
  //view
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("view");
  await page.getByRole("button", { name: "Submitted 1 times" }).click();
  await expect(
    page
      .locator("table")
      .filter({ hasText: "Output:Successfulview!12345Iwantitthatway" })
  ).toBeVisible();
  // await expect(
  //   page.locator("table").filter({ hasText: "12345" })
  // ).toBeVisible();
  // await expect(
  //   page.locator("table").filter({ hasText: "Iwantitthatway" })
  // ).toBeVisible();
  // second view
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load_file noheader");
  await page.getByRole("button", { name: "Submitted 2 times" }).click();
  await expect(
    page
      .locator("table")
      .filter({ hasText: "Output:load_fileofnoheadersuccessful!" })
  ).toBeVisible();
  //view
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("view");
  await page.getByRole("button", { name: "Submitted 3 times" }).click();
  await expect(
    page.locator("table").filter({
      hasText: "Output:Successfulview!KevinCIT32JoeMetCalf330CarlaBarus32",
    })
  ).toBeVisible();
  // await expect(
  //   page.locator("table").filter({ hasText: "KevinCIT23" })
  // ).toBeVisible();
  // await expect(
  //   page.locator("table").filter({ hasText: "JoeMetCalf330" })
  // ).toBeVisible();
  // await expect(
  //   page.locator("table").filter({ hasText: "CarlaBarus32" })
  // ).toBeVisible();
});
// view with a bad and a good load
test("view with bad and good load", async ({ page }) => {
  //first submit
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load_file badfile");
  await page.getByRole("button", { name: "Submitted 0 times" }).click();
  await expect(
    page.locator("table").filter({ hasText: "Output:Couldnotfindbadfile" })
  ).toBeVisible();
  // second load
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load_file noheader");
  await page.getByRole("button", { name: "Submitted 1 times" }).click();
  await expect(
    page
      .locator("table")
      .filter({ hasText: "Output:load_fileofnoheadersuccessful!" })
  ).toBeVisible();
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("view");
  await page.getByRole("button", { name: "Submitted 2 times" }).click();
  await expect(
    page.locator("table").filter({
      hasText: "Output:Successfulview!KevinCIT32JoeMetCalf330CarlaBarus32",
    })
  ).toBeVisible();
});

// search without load
test("fails search without load & bad input", async ({ page }) => {
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("search 1second");
  await page.getByRole("button", { name: "Submitted 0 times" }).click();
  await expect(
    page
      .locator("table")
      .filter({ hasText: "Output:Error:searchneedsthreeargs" })
  ).toBeVisible();
});

test("fails search without load & bad args", async ({ page }) => {
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("search 1 second");
  await page.getByRole("button", { name: "Submitted 0 times" }).click();
  await expect(
    page
      .locator("table")
      .filter({ hasText: "Output:Error:searchrequiresaload" })
  ).toBeVisible();
});
// search with view and load
test("valid search with view and load", async ({ page }) => {
  //load
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load_file way");
  await page.getByRole("button", { name: "Submitted 0 times" }).click();
  await expect(
    page
      .locator("table")
      .filter({ hasText: "Output:load_fileofwaysuccessful!" })
  ).toBeVisible();
  //view
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("view");
  await page.getByRole("button", { name: "Submitted 1 times" }).click();
  await expect(
    page
      .locator("table")
      .filter({ hasText: "Output:Successfulview!12345Iwantitthatway" })
  ).toBeVisible();
  // search
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("search 1 want");
  await page.getByRole("button", { name: "Submitted 2 times" }).click();
  await expect(
    page
      .locator("table")
      .filter({ hasText: "Output:Searching!:)Iwantitthatway" })
  ).toBeVisible();
});
// search with load
test("valid search with load", async ({ page }) => {
  //load
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load_file way");
  await page.getByRole("button", { name: "Submitted 0 times" }).click();
  await expect(
    page
      .locator("table")
      .filter({ hasText: "Output:load_fileofwaysuccessful!" })
  ).toBeVisible();
  // search
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("search 1 want");
  await page.getByRole("button", { name: "Submitted 1 times" }).click();
  await expect(
    page
      .locator("table")
      .filter({ hasText: "Output:Searching!:)Iwantitthatway" })
  ).toBeVisible();
});
// search bad input
test("failed bad search with load", async ({ page }) => {
  //load
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load_file way");
  await page.getByRole("button", { name: "Submitted 0 times" }).click();
  await expect(
    page
      .locator("table")
      .filter({ hasText: "Output:load_fileofwaysuccessful!" })
  ).toBeVisible();
  // search
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("search bad input");
  await page.getByRole("button", { name: "Submitted 1 times" }).click();
  await expect(
    page.locator("table").filter({
      hasText: "Output:Searching!:)",
    })
  ).toBeVisible();
  await expect(
    page.locator("tr").filter({
      hasText: "Argsbadinput",
    })
  ).toBeVisible();
});
// search too many arguments
test("failed bad search too many args", async ({ page }) => {
  //load
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load_file way");
  await page.getByRole("button", { name: "Submitted 0 times" }).click();
  await expect(
    page
      .locator("table")
      .filter({ hasText: "Output:load_fileofwaysuccessful!" })
  ).toBeVisible();
  // search
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("search bad input long");
  await page.getByRole("button", { name: "Submitted 1 times" }).click();
  await expect(
    page.locator("table").filter({
      hasText: "Output:Error:searchneedsthreeargs",
    })
  ).toBeVisible();
});
// search not enough arguments
test("failed bad search not enough args", async ({ page }) => {
  //load
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load_file way");
  await page.getByRole("button", { name: "Submitted 0 times" }).click();
  await expect(
    page
      .locator("table")
      .filter({ hasText: "Output:load_fileofwaysuccessful!" })
  ).toBeVisible();
  // search
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("search bad");
  await page.getByRole("button", { name: "Submitted 1 times" }).click();
  await expect(
    page.locator("table").filter({
      hasText: "Output:Error:searchneedsthreeargs",
    })
  ).toBeVisible();
});
// invalid command
test("failed invalid command", async ({ page }) => {
  //load
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("badcommand");
  await page.getByRole("button", { name: "Submitted 0 times" }).click();
  await expect(
    page.locator("table").filter({
      hasText: "Output:Error:badcommand.badcommandisnotarealcommand",
    })
  ).toBeVisible();
});
