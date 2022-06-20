const initialState = 0;
const AssignCompany = (state = initialState, action) => {
  if (action.type === "Assign company data")
    return state=action.value;
  return state;
};
export default AssignCompany;
