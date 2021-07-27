type ReduxAction = {
  type: string;
  payload?: any;
  meta?: any;
};

type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
  };
  geo: {
    lat: string;
    lng: string;
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
  nameMatchIndex: number;
  usernameMatchIndex: number;
  emailMatchIndex: number;
};

type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};
