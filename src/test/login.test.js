import jest from 'jest';

// Define a mock event and form data
const event = { preventDefault: jest.fn() };
const formData = { email: 'test@example.com', password: 'password123' };

describe('handleSubmit', () => {
  beforeEach(() => {
    event.preventDefault.mockClear();
  });

  it('should prevent default event behavior', () => {
    handleSubmit(event, formData);
    expect(event.preventDefault).toHaveBeenCalled();
  });

  it('should display an error if email is invalid', () => {
    const invalidEmailData = { email: 'invalid_email', password: 'password123' };
    const setError = jest.fn();
    handleSubmit(event, invalidEmailData, setError);
    expect(setError).toHaveBeenCalledWith('Email is Not Valid');
  });

  it('should display an error if email or password is empty', () => {
    const emptyFormData = { email: '', password: '' };
    const setError = jest.fn();
    handleSubmit(event, emptyFormData, setError);
    expect(setError).toHaveBeenCalledWith('No Fields Can Be Empty');
  });

  it('should make a POST request with form data', async () => {
    const mockFetch = jest.fn();
    window.fetch = mockFetch;

    const mockResponse = { success: true };
    mockFetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mockResponse),
    });

    const expectedOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    };

    await handleSubmit(event, formData);

    expect(mockFetch).toHaveBeenCalledWith('/api/AppLogin', expectedOptions);
  });
});
