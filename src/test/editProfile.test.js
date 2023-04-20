describe('handleSubmit', () => {
    let mockUsers;
    let mockResponse;
  
    beforeEach(() => {
      mockUsers = [
        {
          id: 1,
          LoggedIn: false
        },
        {
          id: 2,
          LoggedIn: true
        }
      ];
      mockResponse = {
        json: jest.fn(() => ({ success: true })),
        error: null
      };
      global.fetch = jest.fn(() => Promise.resolve(mockResponse));
    });
  
    afterEach(() => {
      jest.restoreAllMocks();
    });
  
    it('should find the ID of the logged in job posting and make a POST request', async () => {
      const mockFormData = {
        firstname: 'John',
        lastname: 'Doe',
        email: 'johndoe@example.com',
        country: 'Canada',
        postalCode: '12345',
        bio: 'I create code',
        city: 'Montreal',
        phone: '123-456-7890',
        password: 'p@ssw0rd'
      };
      global.users = mockUsers;
  
      await handleSubmit(mockFormData);
  
      expect(fetch).toHaveBeenCalledWith('/api/editProfil', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          loggedInJobPostingId: 2,
          ...mockFormData
        })
      });
      expect(mockResponse.json).toHaveBeenCalled();
      expect(console.log).toHaveBeenCalledWith('this is the json');
      expect(console.log).toHaveBeenCalledWith({ success: true });
    });
  
    it('should log an error if the fetch request fails', async () => {
      global.users = mockUsers;
      global.fetch = jest.fn(() => Promise.reject(new Error('Network Error')));
  
      await handleSubmit({});
  
      expect(console.error).toHaveBeenCalledWith(new Error('Network Error'));
    });
  
    it('should log an error if no job posting is found with LoggedIn = true', async () => {
      global.users = [{ id: 1, LoggedIn: false }];
  
      await handleSubmit({});
  
      expect(console.log).toHaveBeenCalledWith('No job posting found where loggedIn is true.');
    });
  });
  