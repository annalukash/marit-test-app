import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { Container, Row, Col } from "react-bootstrap";
import { addCharacter, removeCharacter, editCharacter } from "./store/actions";

const CharacterContainer = styled.div`
    margin: 20px;
    text-align: center;
    border-bottom: 1px solid rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 20px;

    & div span {
        font-size: 15px;
    }

    & div span .minus {
        color: red;
        margin-right: 10px;
        cursor: pointer;
        font-size: 20px;
    }

    & div span .edit {
        color: rgba(0, 13, 160, 1);
        cursor: pointer;
        font-size: 20px;
    }
`;

const ColumnContainer = styled.div`
    border: 1px solid rgb(227, 227, 227);
    border-radius: 15px;
    box-shadow: 0px 5px 8px 0px rgba(0, 0, 0, 0.1);
`;

const Title = styled.div`
    font-size: 25px;
    font-weight: 500;
    margin-right: 15px;

    & + div i {
        color: green;
        cursor: pointer;

        &:hover {
            transform: scale(1.2);
        }
    }
`;

const Backdrop = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: ${(props) => (props.isShown ? "block" : "none")};
    z-index: 100;
`;

const Modal = styled.div`
    background-color: white;
    padding: 20px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
`;

const ModalTitle = styled.div`
    font-size: 20;
    font-weight: 500;
`;

const Label = styled.div`
    font-size: 15px;
    margin-top: 15px;
`;

const Input = styled.input`
    border: none;
    border-bottom: 1px solid #000;
    outline: none;
`;

const Button = styled.button`
    margin: 0 auto;
    margin-top: 25px;
    border-radius: 12px;
    color: white;
    padding: 7px 15px;

    &:focus {
        outline: none;
    }
`;

const SaveButton = styled(Button)`
    border: 1px solid green;
    background-color: green;
`;

const CancelButton = styled(Button)`
    border: 1px solid red;
    background-color: red;
    margin-right: 15px;
`;

function App() {
    const { charactersList } = useSelector((state) => state);
    const [state, setState] = useState({ isModalVisible: false, name: "", race: "", type: "open", id: "" });
    const dispatch = useDispatch();

    const renderCharacters = (race) => {
        const character = charactersList
            .filter((item) => item.race === race)
            .map((item, index) => {
                return (
                    <CharacterContainer key={index}>
                        <div>
                            {" "}
                            <span>Name:</span> {item.name}
                        </div>
                        <div>
                            <span onClick={() => deleteCharacter(item.id)}>
                                <i className="fa fa-minus-square minus" aria-hidden="true"></i>
                            </span>
                            <span onClick={() => openModal(item.race, true, item.name, item.id)}>
                                <i className="fa fa-pencil-square-o edit" aria-hidden="true"></i>
                            </span>
                        </div>
                    </CharacterContainer>
                );
            });

        return character;
    };

    const openModal = (race, type, name, id) => {
        setState({
            ...state,
            isModalVisible: true,
            race,
            type: type ? "edit" : "open",
            name: type ? name : "",
            id: type ? id : "",
        });
    };

    const closeModal = () => {
        setState({ ...state, isModalVisible: false, name: "", race: "" });
    };

    const saveButtonHandler = (id) => {
        if (state.type === "open") {
            const newCharacter = {
                id: Math.floor(Math.random() * (999 - 100)) + 100,
                name: state.name,
                race: state.race,
            };
            dispatch(addCharacter(newCharacter));
        } else {
            const character = charactersList.find((item) => item.id === id);
            character.name = state.name;
            console.log(character);
            dispatch(editCharacter(character));
        }

        closeModal();
    };

    const deleteCharacter = (id) => {
        dispatch(removeCharacter(id));
    };

    return (
        <Container className="mt-5">
            <Backdrop isShown={state.isModalVisible}>
                <Modal>
                    <ModalTitle>{state.type === "open" ? "Create new character" : "Edit character"}</ModalTitle>
                    <Label>Name</Label>
                    <Input
                        type="text"
                        value={state.name}
                        onChange={(event) => setState({ ...state, name: event.target.value })}
                    />
                    <div>
                        <CancelButton onClick={closeModal}>Cancel</CancelButton>
                        <SaveButton disabled={!(state.name && state.race)} onClick={() => saveButtonHandler(state.id)}>
                            Save Character
                        </SaveButton>
                    </div>
                </Modal>
            </Backdrop>
            <Row className="justify-content-center">
                <Col className="text-center">
                    <Row className="align-items-center justify-content-center">
                        <Title>Hobbit</Title>
                        <div onClick={() => openModal("Hobbit")}>
                            <i className="fa fa-plus-circle" aria-hidden="true"></i>
                        </div>
                    </Row>
                    <ColumnContainer>{renderCharacters("Hobbit")}</ColumnContainer>
                </Col>
                <Col className="text-center">
                    <Row className="align-items-center justify-content-center">
                        <Title>Human</Title>
                        <div onClick={() => openModal("Human")}>
                            <i className="fa fa-plus-circle" aria-hidden="true"></i>
                        </div>
                    </Row>
                    <ColumnContainer>{renderCharacters("Human")}</ColumnContainer>
                </Col>
                <Col className="text-center">
                    <Row className="align-items-center justify-content-center">
                        <Title>Dworf</Title>
                        <div onClick={() => openModal("Dworf")}>
                            <i className="fa fa-plus-circle" aria-hidden="true"></i>
                        </div>
                    </Row>
                    <ColumnContainer>{renderCharacters("Dworf")}</ColumnContainer>
                </Col>
                <Col className="text-center">
                    <Row className="align-items-center justify-content-center">
                        <Title>Elf</Title>
                        <div onClick={() => openModal("Elf")}>
                            <i className="fa fa-plus-circle" aria-hidden="true"></i>
                        </div>
                    </Row>
                    <ColumnContainer>{renderCharacters("Elf")}</ColumnContainer>
                </Col>
            </Row>
        </Container>
    );
}

export default App;
