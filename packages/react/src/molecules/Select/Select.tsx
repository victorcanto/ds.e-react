import React, {
  createRef,
  KeyboardEventHandler,
  useEffect,
  useRef,
  useState,
} from 'react';
import Text from '../../atoms/Text';

const KEY_CODES = {
  ENTER: 13,
  SPACE: 32,
  DOWN_ARROW: 40,
  UP_ARROW: 38,
  ESC: 27,
};

export interface SelectOption {
  label: string;
  value: string;
}

export interface RenderOptionProps {
  isSelected: boolean;
  option: SelectOption;
  getOptionRecommendedProps: (overrideProps?: Object) => Object;
}

export interface SelectProps {
  children?: React.ReactNode;
  onOptionSelected?: (option: SelectOption, optionIndex: number) => void;
  options?: SelectOption[];
  label?: string;
  renderOption?: (props: RenderOptionProps) => React.ReactNode;
}

const getNextOptionIndex = (
  currentIndex: number | null,
  options: SelectOption[]
) => {
  if (currentIndex === null) {
    return 0;
  }

  if (currentIndex === options.length - 1) {
    return 0;
  }

  return currentIndex + 1;
};

const getPreviousOptionIndex = (
  currentIndex: number | null,
  options: SelectOption[]
) => {
  if (currentIndex === null) {
    return 0;
  }

  if (currentIndex === 0) {
    return options.length - 1;
  }

  return currentIndex - 1;
};

const Select = ({
  options = [],
  label = 'Please select an option...',
  onOptionSelected,
  renderOption,
}: SelectProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [hightlightedIndex, setHightlightedIndex] = useState<number | null>(0);
  const labelRef = useRef<HTMLButtonElement | null>(null);
  const [optionRefs, setOptionRefs] = useState<
    React.RefObject<HTMLLIElement>[]
  >([]);
  const [overlayTop, setOverlayTop] = useState<number>(0);

  const onOptionSelectedHandler = (
    option: SelectOption,
    optionIndex: number
  ): void => {
    if (onOptionSelected) {
      onOptionSelected(option, optionIndex);
    }

    setSelectedIndex(optionIndex);
    setIsOpen(false);
  };

  const onLabelClick = (): void => setIsOpen(!isOpen);

  useEffect(() => {
    setOverlayTop(((labelRef.current?.offsetHeight || 0) as number) + 10);
  }, [labelRef.current?.offsetHeight]);

  let selectedOption = null;

  if (selectedIndex !== null) {
    selectedOption = options[selectedIndex];
  }

  const highlightedOption = (optionIndex: number | null): void => {
    setHightlightedIndex(optionIndex);
  };

  const onButtonKeyDown: KeyboardEventHandler = (event): void => {
    event.preventDefault();

    if (
      [KEY_CODES.ENTER, KEY_CODES.SPACE, KEY_CODES.DOWN_ARROW].includes(
        event.keyCode
      )
    ) {
      setIsOpen(true);

      highlightedOption(0);
    }
  };

  useEffect(() => {
    setOptionRefs(options.map((_) => createRef<HTMLLIElement>()));
  }, [options.length]);

  useEffect(() => {
    if (hightlightedIndex !== null && isOpen) {
      const ref = optionRefs[hightlightedIndex];

      if (ref && ref.current) {
        ref.current.focus();
      }
    }
  }, [isOpen, hightlightedIndex]);

  const onOptionKeyDown: KeyboardEventHandler = (event): void => {
    if (event.keyCode === KEY_CODES.ESC) {
      setIsOpen(false);
      return;
    }

    if (event.keyCode === KEY_CODES.UP_ARROW) {
      highlightedOption(getPreviousOptionIndex(hightlightedIndex, options));
    }

    if (event.keyCode === KEY_CODES.DOWN_ARROW) {
      highlightedOption(getNextOptionIndex(hightlightedIndex, options));
    }

    if (event.keyCode === KEY_CODES.ENTER) {
      onOptionSelectedHandler(options[hightlightedIndex!], hightlightedIndex!);
    }
  };

  return (
    <div className='dse-select'>
      <button
        data-testid='DseSelectButton'
        onKeyDown={onButtonKeyDown}
        aria-controls='dse-select-list'
        aria-haspopup={true}
        aria-expanded={isOpen ? true : undefined}
        ref={labelRef}
        className='dse-select__label'
        onClick={onLabelClick}>
        <Text>{selectedOption === null ? label : selectedOption.label}</Text>
        <svg
          width='1rem'
          height='1rem'
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className={`dse-select__caret ${
            isOpen ? 'dse-select__caret--open' : 'dse-select__caret--closed'
          }`}>
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M19.5 8.25l-7.5 7.5-7.5-7.5'
          />
        </svg>
      </button>

      <ul
        role='menu'
        id='dse-select-list'
        style={{ top: overlayTop }}
        className={`dse-select__overlay ${
          isOpen ? 'dse-select__overlay--open' : ''
        }`}>
        {options.map((option, optionIndex) => {
          const isSelected = selectedIndex === optionIndex;
          const isHighlighted = hightlightedIndex === optionIndex;

          const ref = optionRefs[optionIndex];

          const renderOptionProps: RenderOptionProps = {
            option,
            isSelected,
            getOptionRecommendedProps: (overrideProps = {}) => {
              return {
                ref,
                role: 'menuitemradio',
                'aria-label': option.label,
                'aria-checked': isSelected ? true : undefined,
                onKeyDown: onOptionKeyDown,
                tabIndex: isHighlighted ? -1 : 0,
                onMouseEnter: () => highlightedOption(optionIndex),
                onMouseLeave: () => highlightedOption(null),
                className: `dse-select__option
                  ${isSelected ? 'dse-select__option--selected' : ''}
                  ${isHighlighted ? 'dse-select__option--highlighted' : ''}
                `,
                key: option.value,
                onClick: () => onOptionSelectedHandler(option, optionIndex),
                ...overrideProps,
              };
            },
          };

          if (renderOption) {
            return renderOption(renderOptionProps);
          }
          return (
            <li {...renderOptionProps.getOptionRecommendedProps()}>
              <Text>{option.label}</Text>
              {isSelected ? (
                <svg
                  width='1rem'
                  height='1rem'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='w-6 h-6'>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M4.5 12.75l6 6 9-13.5'
                  />
                </svg>
              ) : null}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Select;
