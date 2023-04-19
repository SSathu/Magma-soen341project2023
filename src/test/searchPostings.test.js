import { expect } from 'chai';

const inputHandler = (event, postings, setfilteredData) => {
  const searchedWord = event.target.value;
  const newFilter = postings.filter((value) => {
    return value.jobTitle.toLowerCase().includes(searchedWord.toLowerCase());
  });
  setfilteredData(newFilter);
};

describe('inputHandler', () => {
  it('should filter postings by job title', () => {
    const postings = [
      { jobTitle: 'Software Developer' },
      { jobTitle: 'Product Manager' },
      { jobTitle: 'Data Analyst' },
    ];

    const event = {
      target: {
        value: 'manager',
      },
    };

    const expectedFilter = [{ jobTitle: 'Product Manager' }];

    const setfilteredData = jest.fn();

    inputHandler(event, postings, setfilteredData);

    expect(setfilteredData).to.have.been.calledWith(expectedFilter);
  });
});
