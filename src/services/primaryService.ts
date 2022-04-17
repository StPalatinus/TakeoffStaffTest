const BASE_URL = "http://localhost:3001/";
const LOGIN = "login";
const CONTACTS = "640/contacts"

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

  async fetchGetContacts(contactsData: {
    id: number,
    token: string,
  }){
    const URL = `${BASE_URL}${CONTACTS}?userId=${contactsData.id}`;
    try {
      const response = await fetch(URL, { 
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          'Authorization': `Bearer ${contactsData.token}`,
        },
        // body: {}
      });

      if (!response.ok) {
        throw new Error(
          `Could not receive data from ${URL} , received error ${response.status}`
        );
      }
      const body = await response.json();
      return body[0];
    } catch (err: any) {
      if (err.name === "AbortError") {
        throw new Error(`Aborted`);
      }
      throw err;
    }
  };

  async fetchModifyContacts(newContactData: {
    id: number,
    token: string,
    newContacts: string[],
  }){
    const URL = `${BASE_URL}${CONTACTS}/${newContactData.id}`;
    try {
      const response = await fetch(URL, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          'Authorization': `Bearer ${newContactData.token}`,
        },
        body:  JSON.stringify({"contactsList":newContactData.newContacts})
      });

      if (!response.ok) {
        throw new Error(
          `Could not receive data from ${URL} , received error ${response.status}`
        );
      }
      const body = await response.json();
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
export const { fetchGetContacts } = loginService;
export const { fetchModifyContacts } = loginService;
