const BASE_URL = "http://localhost:3001/";
const LOGIN = "login";
const CONTACTS = "660/contacts"

class LoginService {
  async loginToServer(loginData: {
    password: string,
    remember: boolean,
    email: string,
  }) {
    const URL = `${BASE_URL}${LOGIN}`;
    try {
      const response = await fetch(URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
          email: loginData.email,
          password: loginData.password
        })
      });

      if (!response.ok) {
        throw new Error(
          `Could not receive data from ${URL} , received error ${response.status}`
        );
      }
      const body = await response.json();
      return body;
    } catch (err: any) {
      if (err.name === "AbortError") {
        throw new Error(`Aborted`);
      }
      throw err;
    }
  };

  async fetchContacts(contactsData: {
    id: number,
    token: string,
  }){
    const URL = `${BASE_URL}${CONTACTS}?userId=${contactsData.id}`;
    try {
      const response = await fetch("http://localhost:3001/660/contacts?userId=2", {
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          'Authorization': `Bearer ${contactsData.token}`,
        },
      });
      // console.log(response);

      if (!response.ok) {
        throw new Error(
          `Could not receive data from ${URL} , received error ${response.status}`
        );
      }
      const body = await response.json();
      // console.log(body[0]);
      return body[0];
    } catch (err: any) {
      if (err.name === "AbortError") {
        throw new Error(`Aborted`);
      }
      throw err;
    }
  };
}

const loginService = new LoginService();

export const { loginToServer } = loginService;
export const { fetchContacts } = loginService;
