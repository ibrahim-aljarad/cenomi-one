import React from 'react';
import { View } from 'react-native';
import { Images } from '../../../theme';
import { RfH, RfW } from '../../../utils/helpers';
import TextCard from './TextCard';
import { localize } from '../../../locale/utils';

const AcademicCards = (props: any) => {
  return (
    <View
      style={{
        paddingVertical: RfH(20),
        alignItems: 'center',
        paddingHorizontal: RfW(24)
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          height: RfH(80)
        }}>
        <TextCard
          textTitle={localize('hrRequest.annualLimit')}
          textValue={'9 AED'}
          icon={Images.calendar}
        />
        <TextCard
          textTitle={localize('hrRequest.utilized')}
          textValue={'0 AED'}
          icon={Images.calendarClock}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          height: RfH(80),
          marginTop: RfH(15)
        }}>
        <TextCard
          textTitle={localize('hrRequest.remaining')}
          textValue={'12 AED'}
          icon={Images.calendar}
        />
        <TextCard
          textTitle={localize('hrRequest.pending')}
          textValue={'10 AED'}
          icon={Images.calendarClock}
        />
      </View>
    </View>
  );
};

export default AcademicCards;
