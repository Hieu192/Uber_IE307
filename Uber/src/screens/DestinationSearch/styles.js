import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    padding: 16,
    height: '100%',
  },
  input: {
    width: '85%',
    height: 45,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    marginLeft: 30,
    paddingLeft: 16,
    backgroundColor: '#fff',
  },
  listView: {
    margin: 16,
    marginTop: 40,
    position: 'absolute',
    top: 105,
  },
  autocompleteContainer: {
    position: 'absolute',
    top: 0,
    left: 10,
    right: 10,
  },

  row: {
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  iconContainer: {
    backgroundColor: '#a2a2a2',
    padding: 5,
    borderRadius: 50,
    marginRight: 15,
  },
  lineSuggest: {
    height: 1,
    backgroundColor: '#ddd', // Màu của đường phân cách
    marginVertical: 10, // Khoảng cách giữa các dòng
  },
  locationText: {
    fontSize: 16,
    // marginVertical: 10,
  },

  circle: {
    width: 15,
    height: 15,
    backgroundColor: 'blue',
    position: 'absolute',
    top: 31,
    left: 15,
    borderRadius: 15,
  },
  line: {
    width: 1,
    height: 46,
    backgroundColor: '#c4c4c4',
    position: 'absolute',
    top: 46,
    left: 22.5,
  },
  square: {
    width: 15,
    height: 15,
    backgroundColor: 'red',
    position: 'absolute',
    top: 92,
    left: 15,
    borderRadius: 15,
  },
  rowButton: {
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },

  button: {
    // backgroundColor: '#4CAF50',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    alignItems: 'center',
    marginRight: 16,
  },
  selectButton: {
    backgroundColor: '#4CAF50',
  }
});

export default styles;
