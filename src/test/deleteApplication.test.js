const handleDelete = (row) => {
    formData.CompanyName = row.companyname;
    formData.JobPosition = row.jobtitle;
    formData.Status = row.status;
    formData.EmployerEmail = row.empemail;

    sendInfo();



  };

  async function sendInfo() {

    const response = await fetch('/api/DeleteApplication', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        CompanyName: formData.CompanyName,
        JobPosition: formData.JobPosition,
        Status: formData.Status,
        EmployerEmail: formData.EmployerEmail
      })
    });
    const json = await response.json();
    if (json.error) {
      console.log(json.error);
    } else {
      window.location.href = '/applications'
    }
  }

  describe('handleDelete', () => {
    const mockRow = {
      companyname: 'Test Company',
      jobtitle: 'Test Job',
      status: 'Pending',
      empemail: 'test@example.com'
    };
  
    const mockFormData = {
      CompanyName: '',
      JobPosition: '',
      Status: '',
      EmployerEmail: ''
    };
  
    const mockFetchResponse = { json: () => Promise.resolve({}) };
  
    beforeEach(() => {
      jest.spyOn(window, 'fetch').mockImplementation(() =>
        Promise.resolve(mockFetchResponse)
      );
    });
  
    afterEach(() => {
      window.fetch.mockRestore();
    });
  
    it('should set form data and call sendInfo', async () => {
      const sendInfoSpy = jest.spyOn(global, 'sendInfo');
  
      handleDelete(mockRow);
  
      expect(mockFormData.CompanyName).toEqual(mockRow.companyname);
      expect(mockFormData.JobPosition).toEqual(mockRow.jobtitle);
      expect(mockFormData.Status).toEqual(mockRow.status);
      expect(mockFormData.EmployerEmail).toEqual(mockRow.empemail);
  
      expect(sendInfoSpy).toHaveBeenCalled();
    });
  
    it('should call fetch with the correct arguments', async () => {
      await sendInfo();
  
      expect(window.fetch).toHaveBeenCalledWith('/api/DeleteApplication', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          CompanyName: mockFormData.CompanyName,
          JobPosition: mockFormData.JobPosition,
          Status: mockFormData.Status,
          EmployerEmail: mockFormData.EmployerEmail
        })
      });
    });
  
    it('should redirect to /applications if successful', async () => {
      const mockResponse = { json: () => Promise.resolve({}) };
      window.fetch.mockResolvedValue(mockResponse);
  
      await sendInfo();
  
      expect(window.location.href).toEqual('/applications');
    });
  
    it('should log the error if there is one', async () => {
      const mockResponse = { json: () => Promise.resolve({ error: 'test error' }) };
      window.fetch.mockResolvedValue(mockResponse);
  
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
  
      await sendInfo();
  
      expect(consoleSpy).toHaveBeenCalledWith('test error');
    });
  });
  