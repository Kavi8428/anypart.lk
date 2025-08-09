import { PhoneAuthProvider, signInWithCredential } from 'firebase/auth';
import { auth } from './config';

const MOCK_AUTH = true; // Set to true for Expo Go testing, false for real auth

class PhoneAuthService {
  constructor() {
    this.verificationId = null;
  }

  async sendOTP(phoneNumber) {
    if (MOCK_AUTH) {
      // Mock OTP sending
      this.verificationId = `mock-verification-${phoneNumber}`;
      return {
        success: true,
        verificationId: this.verificationId,
      };
    }
    try {
      const formattedPhone = this.formatPhoneNumber(phoneNumber);
      const provider = new PhoneAuthProvider(auth);
      const verificationId = await provider.verifyPhoneNumber(formattedPhone, undefined); // No reCAPTCHA
      this.verificationId = verificationId;
      return {
        success: true,
        verificationId,
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  }

  async verifyOTP(otp) {
    if (MOCK_AUTH) {
      // Mock OTP verification
      return {
        success: true,
        user: { uid: `mock-user-${this.verificationId}`, phoneNumber: this.formatPhoneNumber(otp) },
      };
    }
    try {
      if (!this.verificationId) throw new Error('OTP not sent yet');
      const credential = PhoneAuthProvider.credential(this.verificationId, otp);
      const userCredential = await signInWithCredential(auth, credential);
      return {
        success: true,
        user: userCredential.user,
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  }

  formatPhoneNumber(phone) {
    const cleaned = phone.replace(/\D/g, '');
    if (!cleaned.startsWith('94')) {
      return `+94${cleaned.substring(1)}`;
    }
    return `+${cleaned}`;
  }
}

export default new PhoneAuthService();