const {test,expect}=require("@playwright/test")

test("UICOMPONENTS",async({page})=>{
    
    const username=page.locator('#username')
    const password=page.locator("[type='password']");
    const dropType=page.locator("select.form-control")
    const radio=page.locator('span.checkmark')
    const OkBut=page.locator('#okayBtn')
    const signIn=page.locator(".btn.btn-info")
    const check=page.locator("#terms")
    const blinkText=page.locator("[href*='documents-request']")

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/")

    await username.fill('rahulshettyacademy')
    await password.fill('learning')

    await radio.nth(1).click()
    await OkBut.click()
    await expect(radio.nth(1)).toBeChecked
    console.log(await radio.nth(1).isChecked()) //This will return boolena value

    await dropType.selectOption('consult')

    await check.check()
    await expect(check).toBeChecked

    await check.uncheck()
    expect(await check.isChecked()).toBeFalsy()//since we do not have direct assertion for uncheck

    //to check a text is blinking
    await expect(blinkText).toHaveAttribute("class","blinkingText")


    await signIn.click()
    //await page.pause()


})

test("childwindow",async({browser})=>{
    
    const context =await browser.newContext();
    const page=await context.newPage();
    const blinkText=page.locator("[href*='documents-request']")
    const username=page.locator('#username')
   

    

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/")

//=====>The below ones need to combined to perform the steps together for that we use promise.All()==========>
    // //This return a promise.It is listening for new pages to open.
    // //So it can be in the states pending,rejected or fulfilled
    // const page2=await context.waitForEvent('page') 
   
    // //new page is opened
    // await blinkText.click()

    const [newPage]=await Promise.all([context.waitForEvent('page'),blinkText.click(),])
    const newPageContent=newPage.locator(".im-para.red")

    const text=await newPageContent.textContent()
    console.log(text)

    //Now going back to the parent window
    const textSplit=text.split("@")
    console.log(textSplit)
    const domain=textSplit[1].split(" ")[0]
    console.log(domain)

    username.fill(domain)
    //await page.pause()

    


})
    
