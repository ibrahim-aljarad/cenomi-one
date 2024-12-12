import { StyleSheet } from 'react-native';
import { Colors } from "../../theme";
import { RfH } from "../../utils/helper";
import { isDisplayWithNotch } from "../../utils/helpers";

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: Colors.white,
        paddingTop: isDisplayWithNotch() ? RfH(30) : RfH(10),
      },
      mainView: {
        flex: 1,
      },
      listView: {
        flex: 1,
      },
      endMessageContainer: {
        paddingTop: RfH(15),
        alignItems: 'center',
        marginBottom: RfH(10),
      },
})

export default styles;
