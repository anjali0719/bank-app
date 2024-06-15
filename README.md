# Bank-App 🪙💳

> [!NOTE]
> This application doesn't manipluate any information, it's working is based on hardcoded data (which will be provided here for testing the functionality)

## Usage
1. **Credentials**:
   
  <table>
    <tr>
      <th>Username</th>
      <th>Pin</th>
    </tr>
    <tr>
      <td>js</td>
      <td>1111</td>
    </tr>
    <tr>
      <td>jd</td>
      <td>2222</td>
    </tr>
    <tr>
      <td>stw</td>
      <td>3333</td>
    </tr>
    <tr>
      <td>ss</td>
      <td>4444</td> 
    </tr>
  </table>

2. **Current Balance**: Shows the total balance in the account till date
3. **Transfer Money**:
   1. Username of the receiver
   2. Amount to be transfered <br>
   amount will be debited from the loggedIn user's account and credited to the mentioned user's account. The same will be refelected on the summary screen as well.
4. **Request Loan**: Whatever be the requested amount will be credited to the account and same will be refelected on the summary screen.
5. **Close Account**: Only the loggedIn user can be deleted. Upon enetering the credentials, you'll get back to login page.
6. **Sorting**: The summary can be sorted into increasing and decreasing order.
7. **In,Out,Interest**: shows the total credited, debited & interest respectively.
8. **Log Out Timer**: 5 mins of inactivity will result in session expiry and you'll have to login again. <br>
  > [!NOTE]
  > Upon performing any operation, the timer ⏳ will get reset.
