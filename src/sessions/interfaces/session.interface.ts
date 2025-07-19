import { ObjectId } from 'mongoose';

export interface SessionInterface {
  _id: string | ObjectId;
  expires: {
    $date: string; // ISO date string
  };
  session:
    | string
    | {
        cookie: {
          originalMaxAge: number;
          expires: string; // ISO date string
          secure: boolean;
          httpOnly: boolean;
          path: string;
          sameSite: 'lax' | 'strict' | 'none' | boolean;
        };
        passport: {
          user: {
            activeSessionId: string | null;
            _id: string;
            email: string;
            role: string; // or more specific union type like "owner" | "admin" | "user" if known
            business: string;
            isVerified: boolean;
          };
        };
      };
}
