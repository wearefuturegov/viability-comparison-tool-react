import React from 'react'
import styled from 'styled-components';
import 'react-input-range/lib/css/index.css';
import MinMaxInput from './MinMaxInput';

const ModalInner = styled.div`
    width: 100%;
`

const StoriesModal = ({
    toggleActiveMarker,
    handleCloseModal,
    minStories,
    setMinStories,
    setMinStoriesURL,
    maxStories,
    setMaxStoriesURL,
    setMaxStories,
    StoriesIsFiltered,
    setStoriesIsFiltered,
    maxTotalStories,
    setStoriesButtonText
}) => {
    return (
            <ModalInner>
                <h2>Number of stories</h2>
                <MinMaxInput
                    step={5}
                    toggleActiveMarker={toggleActiveMarker}
                    handleCloseModal={handleCloseModal}
                    min={minStories}
                    setMin={setMinStories}
                    setMinURL={setMinStoriesURL}
                    max={maxStories}
                    setMax={setMaxStories}
                    setMaxURL={setMaxStoriesURL}
                    isFiltered={StoriesIsFiltered}
                    setIsFiltered={setStoriesIsFiltered}
                    maxTotal={maxTotalStories}
                    setButtonText={setStoriesButtonText}
                        />
            </ModalInner>
    )
}

export default StoriesModal
