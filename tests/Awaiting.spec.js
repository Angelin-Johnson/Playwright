const{test,expect}=require('@playwright/test')

test("login Client app",async({page})=>{
    await page.goto('https://rahulshettyacademy.com/client')
    const username=page.locator('#userEmail')
    const password=page.locator('#userPassword')
    const signIn=page.locator('#login')
    

    await username.fill('angelemail@test.com')
    await password.fill('December@07')
    await signIn.click()

    await page.waitForLoadState('networkidle') //waits for all netwrok calls to run 
    //and be idle so it fetches everything or below syntax can be used. to wait for
    //await allItem.first().waitFor();
    const allItem=await page.locator('.card-body b').allTextContents()
    console.log(allItem)
    


})