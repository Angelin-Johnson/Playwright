const{test,expect}=require('@playwright/test')
const { timeout } = require('../playwright.config')

test("login Client app",async({page})=>{
    
    await page.goto('https://rahulshettyacademy.com/client')
    const email='angelemail@test.com'
    const username=page.getByPlaceholder("email@example.com")
    const password= page.getByPlaceholder('enter your passsword')
    const signIn=page.getByRole('button',{name:'login'})
    const cart=page.getByRole('button',{name:'  Cart '}).nth(0)
    const checkout=page.getByRole('button',{name:'Checkout'})
    const country=page.getByPlaceholder('Select Country')
    const dropdownOption=page.locator("section[class*='ta-results']")
    const credit_card=page.locator(".field .input.txt.text-validated")
    const month=page.locator(".field.small .input.ddl").nth(0)
    const year=page.locator(".field.small .input.ddl").nth(1)
    const cvv=page.locator(".field.small .input.txt").nth(0)
    const name=page.locator(".field .input.txt").nth(2)
    const coupon=page.locator(".field.small .input.txt").nth(1)
    const emailId=page.getByLabel('angelemail@test.com')
    //const emailId=page.locator("label[type='text']")
    const placeOrder=page.locator(".btnn.action__submit")
    const orders=await page.locator("[routerlink*='myorders']").first()
    const orderTable=page.locator(".table.table-bordered tbody tr")


    //LogIN to Client site
    await username.fill(email)
    await password.fill('December@07')
    await signIn.click()
    
    //select the desired product and click add to cart
    await page.waitForLoadState('networkidle')
    await page.locator('.card-body').filter({hasText:'ZARA COAT 3'}).getByRole('button',{name:' Add To Cart'}).click()
  
  
    //Click on the cart button
    await cart.click()
    await page.locator('div li').last().waitFor();
    const bool=await page.getByText('ZARA COAT 3').isVisible()
    expect(bool).toBeTruthy()

    
    //Click on the checkout button
    await checkout.click()

    await credit_card.clear()
    await credit_card.fill("4542 9931 9292 2293")
    await month.selectOption('05')
    await year.selectOption('25')
    await cvv.pressSequentially('456')
    await name.fill("Angelin")
    await coupon.fill('1234')

   
    //expect(await emailId.textContent()).toEqual(await page.locator('.input.txt.text-validated.ng-untouched').textContent())
    //to type letter by letter and dynamic dropdown
    await country.pressSequentially("ind")
    await dropdownOption.waitFor();
    await page.getByRole('button',{name:' India'}).nth(1).click()

    expect(await emailId.textContent()).toStrictEqual(email)

    //Place the order:
    await placeOrder.click()
    await page.pause()
    //the confirmation page
    expect(await page.locator(".hero-primary").textContent()).toStrictEqual(' Thankyou for the order. ')
    const orderId=(await page.locator(".em-spacer-1 .ng-star-inserted").textContent()).split(" ")
    const  E_orderId=orderId[2].trim()
    console.log(E_orderId)

    //order Page
  
    await orders.click()
    await orderTable.last().waitFor()
  
    
    
    for(let i=0;i<await orderTable.count();i++){
        const A_orderId=await orderTable.nth(i).locator("th").textContent()
        console.log(A_orderId)
        if(A_orderId===E_orderId){
            await orderTable.nth(i).locator('td .btn.btn-primary').click()
            expect(await page.locator(".col-md-6 .col-text").textContent()).toStrictEqual(A_orderId)
            break;
        }

    }

    await page.pause()

})