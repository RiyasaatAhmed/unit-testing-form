import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import Form from '.';

type helperType = {
  email?: string;
  password?: string;
  confirmPassword?: string;

}

beforeEach(() => {
  render(<Form />);
})


const createTypeAndReturnElements = ({email="", password="",confirmPassword="" }:helperType) => {
  const emailInputElement: HTMLInputElement = screen.getByRole('textbox');
  const passwordInputElement: HTMLInputElement = screen.getByLabelText("Password");
  const confirmPasswordInputElement: HTMLInputElement = screen.getByLabelText(/confirm password/i);

  if(email) {
    userEvent.type(emailInputElement, email);
  }
  if(password) {
    userEvent.type(passwordInputElement, password);
  }
  if(confirmPassword) {
    userEvent.type(confirmPasswordInputElement, confirmPassword);
  }

  return {
    emailInputElement,
    passwordInputElement,
    confirmPasswordInputElement,
  }
}

const clickOnSubmitButton = () => {
  const submitButtonELement: HTMLButtonElement = screen.getByRole('button');
  userEvent.click(submitButtonELement)
}


describe("Testing Form Component", () => {

    test("inputs should be initially empty", () => {
      const { 
        emailInputElement, 
        passwordInputElement, 
        confirmPasswordInputElement
      } = createTypeAndReturnElements({});
    
      expect(emailInputElement.value).toBe("");
      expect(passwordInputElement.value).toBe("");
      expect(confirmPasswordInputElement.value).toBe("");
    })
    
    test("should be able to type an email", () => {
      const {emailInputElement} = createTypeAndReturnElements({email: 'Hello, World!'});
      expect(emailInputElement.value).toBe('Hello,World!');
    });
    
    test("should be table to type in password field", () => {
      const {passwordInputElement} = createTypeAndReturnElements({password: 'thisIsThePassword'});
      expect(passwordInputElement.value).toBe('thisIsThePassword');
    });
    
    test("should be table to type in confirm password field", () => {
      const {confirmPasswordInputElement} = createTypeAndReturnElements({confirmPassword: 'thisIsTheConfirmPassword'});
      expect(confirmPasswordInputElement.value).toBe('thisIsTheConfirmPassword');
    });
    
    test("should validate it user has given a valid email", () => {
    
      expect(screen.queryByText(/This is not a valid email./i)).not.toBeInTheDocument();
      createTypeAndReturnElements({email: 'not a valid email'})
      clickOnSubmitButton()
      expect(screen.queryByText(/This is not a valid email./i)).toBeInTheDocument();
    
    });
    
    test("should validate if user has given a valid password", () => {
    
      // Initially
      expect(screen.queryByText(/the password should be minimum 5 characters long./i)).not.toBeInTheDocument();
      
      // Error Scenario
      const {passwordInputElement} = createTypeAndReturnElements({email: 'valid@gmail.com', password: '123'});
      clickOnSubmitButton()
      expect(screen.queryByText(/the password should be minimum 5 characters long./i)).toBeInTheDocument();
    
      // Success Scenario 
      userEvent.clear(passwordInputElement);
      createTypeAndReturnElements({password: '123456'});
      clickOnSubmitButton()
      expect(screen.queryByText(/the password should be minimum 5 characters long./i)).not.toBeInTheDocument();
    
    });
    
    test("the confirm-password should match with the password", () => {
    
      // Initially
      expect(screen.queryByText(/confirm password didn't match./i)).not.toBeInTheDocument()
      
      // Error State
      const {confirmPasswordInputElement} = createTypeAndReturnElements({email: 'valid@gmail.com', password: '1234567', confirmPassword: '12345'});
      clickOnSubmitButton()
      expect(screen.queryByText(/confirm password didn't match./i)).toBeInTheDocument();
    
      // Success State
      userEvent.clear(confirmPasswordInputElement);
      createTypeAndReturnElements({confirmPassword: '1234567'});
      clickOnSubmitButton()
      expect(screen.queryByText(/confirm password didn't match./i)).not.toBeInTheDocument();
    
    })
    
    test("Should show no error message if every user input is valid", () => {
    
    
      createTypeAndReturnElements({email: 'valid@gmail.com', password: '1234567', confirmPassword: '1234567'});
      clickOnSubmitButton()
    
      expect(screen.queryByText(/This is not a valid email./i)).not.toBeInTheDocument();
      expect(screen.queryByText(/the password should be minimum 5 characters long./i)).not.toBeInTheDocument();
      expect(screen.queryByText(/confirm password didn't match./i)).not.toBeInTheDocument();
    
    })

})