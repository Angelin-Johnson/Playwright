const {test, expect}=require('@playwright/test'); //import playright test annotations from node module

//javascript is asynchronous they do not execute sequentially

test('First testcase',async({browser})=>{

//javascript is asynchronous they do not execute sequentially so need to write await before every step 
//to make sure javascript waits for it to complete.The await gets activated while we add async to function

//browser is a global fixture available  automataically for test annotation.
//Given in {} to consider it as a playwright fixture

//browser.newContext() //this will open a new fresh browser

//to open a browser fresh intance with inbuilt contexts
const context =await browser.newContext();
const page=await context.newPage();
await page.goto("https://rahulshettyacademy.com/loginpagePractise/")
await page.locator('#username').fill('rahulshetty')
    await page.locator("[type='password']").fill('learning')

    await page.locator(".btn.btn-info").click()

    console.log(await page.locator("[style*='block']").textContent());
    await expect(page.locator("[style*='block']")).toContainText("Incorrect")

    //THE FILL command can rewrite the things
    await page.locator('#username').fill('rahulshettyacademy') //THE FILL 
    await page.locator(".btn.btn-info").click()
    await expect(page).toHaveURL("https://rahulshettyacademy.com/angularpractice/shop")


})

test('Seelct the type of phone',async({browser})=>{

    const context =await browser.newContext();
    const page=await context.newPage();
    const username=page.locator('#username')
    const password=page.locator("[type='password']");
    const signIn=page.locator(".btn.btn-info")
    const cardTitle=page.locator(".card-body a");

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/")
        await username.fill('rahulshettyacademy')
        await password.fill('learning')
    
        await signIn.click()
        await expect(page).toHaveURL("https://rahulshettyacademy.com/angularpractice/shop")
    
        console.log(await cardTitle.nth(0).textContent())
        console.log(await cardTitle.nth(1).textContent())
        console.log(await cardTitle.first().textContent())
        console.log(await cardTitle.last().textContent())

        //You cannot directly ask to print all with text content as usual we do in cypress we need to use alltextcontent
        //Also this method will return proper list only if the above commands are executed as the 
        //allcontent text is not included in the table in playwright doc.
        const allTitle=await cardTitle.allTextContents()
        console.log(allTitle)
})

test('Without Context',async({page})=>{

    //Let us say we do not have any contexts to insert like plugins/cookies then we could directly get into url
    // const context =await browser.newContext();
    // const page=await context.newPage();
    await page.goto("https://google.com")
    console.log(await page.title());
    await expect(page).toHaveTitle('Google')
    
    
    })