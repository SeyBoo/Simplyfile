import {AuthBackend} from "../index";
import firebase from '../../../../common/utils/firebase'
import {InvalidUsernameOrPassword} from "../error";
import {Auth, getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword} from 'firebase/auth';
import {UserInfo} from "../../../../common/types/user.interface";

export default class FirebaseAuth implements AuthBackend {
  private readonly firebaseAuth: Auth;

  constructor() {
    this.firebaseAuth = getAuth(firebase);
  }

  async loginWithEmailPassword(email: string, password: string): Promise<UserInfo> {
    try {
      const userCredential = await signInWithEmailAndPassword(this.firebaseAuth, email, password);
      if (userCredential.user.email) {
        return {
          name: userCredential.user.displayName,
          email: userCredential.user.email,
        }
      }
      throw new InvalidUsernameOrPassword();
    } catch (e) {
      throw new InvalidUsernameOrPassword();
    }
  }

  async signUpWithEmailPassword(email: string, password: string): Promise<UserInfo> {
    try {
      const userCredential = await createUserWithEmailAndPassword(this.firebaseAuth, email, password);
      if (userCredential.user.email) {
        return {
          name: userCredential.user.displayName,
          email: userCredential.user.email,
        }
      }
      throw new InvalidUsernameOrPassword();
    } catch (e) {
      throw new InvalidUsernameOrPassword();
    }
  }
}
