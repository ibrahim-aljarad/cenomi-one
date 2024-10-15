import { Platform, StyleSheet } from "react-native";
import { RfH, RfW } from "../../../../utils/helpers";
import { Colors, Fonts } from "../../../../theme";
import { BorderRadius } from "../../../../theme/sizes";
import { getColorWithOpacity } from "../../../../utils/helper";

const styles = StyleSheet.create({
  requestCellView: {
    borderRadius: BorderRadius.BR15,
    backgroundColor: Colors.white,
    marginHorizontal: RfW(24),
    paddingHorizontal: RfW(15),
    marginTop: RfH(16),
  },
  topHeader: {
    flex: 1,
    paddingTop: RfH(12),
    paddingBottom: RfH(12),
    borderBottomWidth: 1,
    borderColor: Colors.grayLine,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cellContainerView: {
    flex: 1,
    flexDirection: "row",
    paddingTop: RfH(5),
    paddingBottom: RfH(5),
  },
  imageStyle: {
    borderRadius: BorderRadius.BR0,
    overflow: "visible",
    width: "auto",
  },
  cell2ContainerView: {
    flex: 1,
    paddingTop: RfH(11),
    paddingBottom: RfH(20),
  },
  lisView: {
    backgroundColor: Colors.appBackground,
    flex: 1,
  },
  desBold: {
    textTransform: "uppercase",
    lineHeight: RfH(20),
  },
  userInfo: {},
  desReg: {
    lineHeight: RfH(16),
  },
  dotView: {
    width: RfH(4),
    height: RfH(4),
    backgroundColor: Colors.black,
    borderRadius: RfH(2),
    marginRight: RfW(4),
    marginTop: RfH(7),
  },
  dateText: {
    fontFamily: Fonts.boldFont,
    lineHeight: RfH(16),
  },
  leftCellView: {},
  rightCellView: {
    alignItems: "flex-start",
    flex: 1,
  },
  topTitle: {
    flex: 1,
    paddingTop: RfH(2),
  },
  imageView: {
    alignItems: "center",
    justifyContent: "flex-start",
  },
  statusButton: {
    flexDirection: "row",
    paddingHorizontal: RfW(8),
    paddingVertical: RfH(4.5),
    borderRadius: RfH(4),
    alignItems: "center",
  },
  progressView: {
    flexDirection: "row",
    width: "60%",
    flexWrap: "wrap",
    justifyContent: "flex-end",
  },
  tableContainer: {
    paddingVertical: RfH(20),
    marginHorizontal: RfW(20),
    backgroundColor: getColorWithOpacity(Colors.midnightExpress, 0.24),
    borderRadius: BorderRadius.BR15,
    paddingHorizontal: RfW(15),
    marginTop: RfH(16),
  },
  tableRow: {
    flexDirection: "column",
  },
  tableHead: {
    borderBottomColor: "red",
    borderBottomWidth: 1,
    marginBottom: RfH(16),
  },
  tableCell: {
    borderColor: "white",
    borderWidth: 1,
  },
  tableList: {
    paddingBottom: RfH(10),
    borderBottomWidth: 4,
    borderBottomColor: getColorWithOpacity(Colors.white, 0.24),
  },
});
export default styles;
