import React, { useState } from 'react';
import styled from 'styled-components';
import Table from '../ui/Table';
import Button from '../ui/Button';

const InspectionStepsTitle = styled.h2`
  margin-bottom: 1rem;
`;

const StyledTable = styled(Table)`
  width: 100%;
  margin-bottom: 1rem;
`;

const InspectionSteps = ({ stepsData, setStepsData, approvalChecked }) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [newStep, setNewStep] = useState({
    vaiheistus: '',
    ajankohta: '',
    osallistujat: '',
  });

  const handleAddRow = () => {
    setShowAddModal(true);
  };

  const handleSaveNewStep = () => {
    setStepsData((prevState) => [...prevState, newStep]);
    setNewStep({ vaiheistus: '', ajankohta: '', osallistujat: '' });
    setShowAddModal(false);
  };

  const handleCancelNewStep = () => {
    setNewStep({ vaiheistus: '', ajankohta: '', osallistujat: '' });
    setShowAddModal(false);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewStep((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <div>
      <InspectionStepsTitle>
        Keskeisimmät tarkastuksen vaiheet
      </InspectionStepsTitle>
      <StyledTable>
        <thead>
          <tr>
            <th>Vaiheistus</th>
            <th>Ajankohta</th>
            <th>Osallistujat</th>
          </tr>
        </thead>
        <tbody>
          {stepsData.map((step, index) => (
            <tr key={index}>
              <td>{step.vaiheistus}</td>
              <td>{step.ajankohta}</td>
              <td>{step.osallistujat}</td>
            </tr>
          ))}
        </tbody>
      </StyledTable>
      <Button onClick={handleAddRow} disabled={approvalChecked}>
        Lisää rivi
      </Button>
      {showAddModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Lisää uusi vaihe</h2>
            <form>
              <label>
                Vaiheistus:
                <input
                  type="text"
                  name="vaiheistus"
                  value={newStep.vaiheistus}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Ajankohta:
                <input
                  type="text"
                  name="ajankohta"
                  value={newStep.ajankohta}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Osallistujat:
                <input
                  type="text"
                  name="osallistujat"
                  value={newStep.osallistujat}
                  onChange={handleInputChange}
                />
              </label>
              <Button type="button" onClick={handleSaveNewStep} disabled={approvalChecked}>
                Tallenna
              </Button>
              <Button type="button" onClick={handleCancelNewStep} disabled={approvalChecked}>
                Peruuta
              </Button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default InspectionSteps;
