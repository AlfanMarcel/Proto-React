declare module 'react-native-datepicker' {
    import * as React from 'react';
    import { StyleProp, ViewStyle, TextStyle } from 'react-native';
  
    interface DatePickerProps {
      date?: Date | string;
      mode?: 'date' | 'time' | 'datetime';
      androidMode?: 'default' | 'calendar' | 'spinner';
      format?: string;
      confirmBtnText?: string;
      cancelBtnText?: string;
      iconSource?: any;
      minDate?: Date | string;
      maxDate?: Date | string;
      duration?: number;
      customStyles?: {
        dateIcon?: StyleProp<ViewStyle>;
        dateInput?: StyleProp<ViewStyle>;
        dateText?: StyleProp<TextStyle>;
        placeholderText?: StyleProp<TextStyle>;
        dateTouchBody?: StyleProp<ViewStyle>;
        datePickerCon?: StyleProp<ViewStyle>;
        datePicker?: StyleProp<ViewStyle>;
        btnCancel?: StyleProp<ViewStyle>;
        btnConfirm?: StyleProp<ViewStyle>;
      };
      onDateChange?: (date: string, dateString: string) => void;
      onOpenModal?: () => void;
      onCloseModal?: () => void;
      style?: StyleProp<ViewStyle>;
      disabled?: boolean;
      placeholder?: string;
      showIcon?: boolean;
      is24Hour?: boolean;
      hideText?: boolean;
      locale?: string;
    }
  
    export default class DatePicker extends React.Component<DatePickerProps> {}
  }
  