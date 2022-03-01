import styled from 'styled-components'

const Container = styled.div`
  font: 600 0.8125em var(--font-primary);
  position: fixed;
  bottom: 0;
  left: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  width: 100%;
  height: 6rem;
  padding: 0 2rem;
  background-color: var(--color-bg-player-${props => props.theme.theme});
  filter: drop-shadow(10px 10px 10px black);
  opacity: 0;
  z-index: 10;
  transition: all 0.25s;
  pointer-events: none;
  &.visible { opacity: 1; pointer-events: all; }
  }
  @media only screen and (max-width: 40em) {
    justify-content: space-between;
  }
`

const Controls = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  padding-left: 4rem;
  width: 20%;
  @media only screen and (max-width: 40em) {
    padding-left: 2.5rem;
    gap: 0;
    input[type="range"] {
      visibility: hidden;
      width: 0;
    }
`

const Button = styled.button`
  display: flex;
  place-items: center;
  color: var(--color-fg-accent-${props => props.theme.theme});
  background-color: transparent;
  font-size: 3rem;
  border: none;
  margin: 0;
  padding: 0;
  height: 4rem;
  cursor: pointer;
  &:active { transform: scale(0.95); }
`

const ToggleButton = styled(Button)`
  position: fixed;
  bottom: 1rem;
  left: 2rem;
  visibility: visible;
  opacity: 1;
  z-index: 100;
  &.down { transform: rotate(0.5turn); }
  transition: all 0.25s;
  @media only screen and (max-width: 40em) { left: 1rem; }
`

const Slider = styled.input.attrs(props => ({ type: 'range' }))`
  appearance: none;
  background-color: var(--color-fg-${props => props.theme.theme});
  width: 8rem;
  height: 0.25rem;
  border-radius: 2px;

  &::-webkit-slider-thumb {
    appearance: none;
    background-color: var(--color-fg-accent-${props => props.theme.theme});
    height: 1.25rem;
    width: 1.25rem;
    border: none;
    border-radius: 50%;
  }
  &::-moz-range-thumb {
    appearance: none;
    background-color: var(--color-fg-accent-${props => props.theme.theme});
    height: 1.25rem;
    width: 1.25rem;
    border: none;
    border-radius: 50%;
  }
`

const SongInfo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 60%;
  span {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`

const Streamer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 20%;
`

const Player = {
  Container,
  Controls,
  Button,
  ToggleButton,
  Slider,
  SongInfo,
  Streamer
}

export default Player
