describe('handleSubmit', () => {
    let mockFormData;
    let mockEvent;
    let mockResponse;
  
    beforeEach(() => {
      mockFormData = {
        firstname: 'John',
        lastname: 'Doe',
        email: 'johndoe@example.com',
        password: 'password',
        occupation: 'Software Developer'
      };
      mockEvent = {
        preventDefault: jest.fn()
      };
      mockResponse = {
        json: jest.fn(() => ({ success: true })),
        error: null
      };
    });
  
    afterEach(() => {
      jest.restoreAllMocks();
    });
  
    it('should prevent default form submission', async () => {
      await handleSubmit(mockEvent);
  
      expect(mockEvent.preventDefault).toHaveBeenCalledTimes(1);
    });
  
    it('should set error if email is not valid', async () => {
      mockFormData.email = 'invalid-email';
  
      await handleSubmit(mockEvent);
  
      expect(mockEvent.preventDefault).toHaveBeenCalledTimes(1);
      expect(setError).toHaveBeenCalledWith('Email is Not Valid');
    });
  
    it('should make a POST request with the correct data', async () => {
      global.fetch = jest.fn(() => Promise.resolve(mockResponse));
  
      await handleSubmit(mockEvent);
  
      expect(fetch).toHaveBeenCalledWith('/api/AppUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(mockFormData)
      });
    });
  
    it('should set error if the server returns an error', async () => {
      mockResponse.error = 'Server Error';
      global.fetch = jest.fn(() => Promise.resolve(mockResponse));
  
      await handleSubmit(mockEvent);
  
      expect(setError).toHaveBeenCalledWith('Server Error');
    });
  
    it('should redirect to login page if server returns success', async () => {
      global.fetch = jest.fn(() => Promise.resolve(mockResponse));
  
      await handleSubmit(mockEvent);
  
      expect(window.location.href).toBe('/logIn');
    });
  });
  