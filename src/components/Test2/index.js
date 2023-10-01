import React, { useState } from "react";
import styled from "styled-components";
import Tree from "./tree.jpeg";

const Container = styled.div`
  position: relative;
  width: 500px;
  height: 600px;
  border: 1px solid #ccc;
  overflow: hidden;
  background-image: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url(${Tree});
`;

const DraggableCircle = styled.div`
  cursor: pointer;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  position: absolute;

  /* Hide the close button by default */
  .close-button {
    display: none;
  }

  /* Show the close button on hover */
  &:hover .close-button {
    display: block;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  /* top: -15px; */
  /* right: -15px; */
  width: 14px;
  height: 14px;
  background-color: #ff0000;
  color: #fff;
  border: none;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 8px;
  padding: 0;
`;

const ClipPathText = styled.div`
  margin-top: 10px;
  font-size: 14px;
`;

const ButtonContainer = styled.div`
  margin-top: 10px;
`;

const getRandomLightColor = () => {
  const randomColor = Math.floor(Math.random() * 360); // Generate a random hue value
  return `hsl(${randomColor}, 70%, 80%)`; // Use HSL to ensure light backgrounds
};

const getRandomPosition = () => {
  // Generate random X and Y coordinates within the container's dimensions
  const x = Math.random() * (500 - 40);
  const y = Math.random() * (600 - 40);
  return { x, y };
};

const DraggableContainer = () => {
  const [elements, setElements] = useState([
    {
      id: "element1",
      ...getRandomPosition(),
      backgroundColor: getRandomLightColor(),
    },
    {
      id: "element2",
      ...getRandomPosition(),
      backgroundColor: getRandomLightColor(),
    },
    // Add more elements as needed
  ]);

  // Function to calculate clip-path value
  const calculateClipPath = (points) => {
    if (points.length < 3) {
      return "";
    }

    // Calculate percentages based on the container's dimensions
    const containerWidth = 500;
    const containerHeight = 600;

    const polygonPoints = points
      .map((point) => {
        const xPercent = (point.x / containerWidth) * 100;
        const yPercent = (point.y / containerHeight) * 100;
        return `${xPercent.toFixed(2)}% ${yPercent.toFixed(2)}%`;
      })
      .join(", ");

    return polygonPoints;
  };

  const clipPathValue = calculateClipPath(elements);

  const handleMouseDown = (event, elementIndex) => {
    event.preventDefault();

    const element = elements[elementIndex];

    const onMouseMove = (event) => {
      const updatedElements = [...elements];
      updatedElements[elementIndex] = {
        ...element,
        x: Math.min(Math.max(0, event.clientX - 20), 500 - 40),
        y: Math.min(Math.max(0, event.clientY - 20), 600 - 40),
      };
      setElements(updatedElements);
    };

    const onMouseUp = () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  };

  const handleAddCircle = () => {
    // Add a new circle element with random background color and position
    const newElement = {
      id: `element${elements.length + 1}`,
      ...getRandomPosition(),
      backgroundColor: getRandomLightColor(),
    };

    setElements([...elements, newElement]);
  };

  const handleRemoveCircle = (elementIndex) => {
    // Remove the circle element at the specified index
    const updatedElements = elements.filter(
      (_, index) => index !== elementIndex
    );
    setElements(updatedElements);
  };
  console.log({ elements });
  return (
    <>
      <Container>
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "red",
            clipPath: ` polygon(${clipPathValue})`,
            backgroundImage: `url(${Tree})`,
          }}
        ></div>
        {elements.map((element, index) => (
          <DraggableCircle
            key={element.id}
            style={{
              left: element.x + "px",
              top: element.y + "px",
              backgroundColor: element.backgroundColor,
            }}
            onMouseDown={(event) => handleMouseDown(event, index)}
          >
            <CloseButton
              className="close-button"
              onClick={() => handleRemoveCircle(index)}
            >
              X
            </CloseButton>
          </DraggableCircle>
        ))}
      </Container>
      <ClipPathText>clip-path: polygon({clipPathValue})</ClipPathText>
      <ButtonContainer>
        <button onClick={handleAddCircle}>Add Circle</button>
      </ButtonContainer>
    </>
  );
};

export default DraggableContainer;
