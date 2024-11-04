The Pre-Requisites and setup:
1.)Node.js SETUP and assign it as a path variable in machine.
What is Node.js - Node.js is an open-source and cross-platform JavaScript runtime environment
https://www.freecodecamp.org/news/what-is-node-js/
2.)Install visual studio code
3.)Create a empty folder and install playwright dependencies
npm init playwright@latest

The folder structure:
1.)Testwhere all the test files will be written
2.)Package.jsonwhere all the dependencies will be present it is a part of node.js projects.
3.)playwright.config.jsit is the runner file where you give configurations to run it


To run the test:
npx playwright test
We provide npx to find the path of playwright dependency in node_module folder
Then test will check on configuration file and run the tests in that path.
This command runs in headless mode.To open the browser
npx playwright test –headed
we can also set it in the configuration file :
headless:false

In Playwright assertions are inbuilt like cypress you do not want to combine with chai or mocha to do it.

To debug and open the inspector :
npx playwright test tests/UIComp.spec.js --debug

To open the codegen tool to automatically write the testcase:
npx playwright codegen http://www.google.com  



	
