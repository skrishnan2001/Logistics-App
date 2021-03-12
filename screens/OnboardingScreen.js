import React from "react";
import { View, Text, Button, StyleSheet  ,Image} from "react-native";
const OnboardingScreen = ({ navigation }) => {
  return (
   <View style={styles.container}>
    <View style={styles.topContainer}>
      <Text style={styles.h1}>Logistics</Text>
      <Text style={styles.h2}>
      Simplifying your freight and logistics needs with a personal approach
      </Text>
    </View>
    <View style={styles.middleContainer}>
      <Image source={{ uri: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOAAAADgCAMAAAAt85rTAAABDlBMVEUeHyH///8AAAD/YAAAGyIYGRsaHiEAGiIcHR+ysrP/YgALDRD8/Pz0XAQxJR4cHyGGh4fy8vJDQ0U1NTiWPhh/gIEUFRjc3NzFTRElJigvMDFLTE1naGkDBgu6ursNHCLNUAzTUwcWHyBdXV9EKB4lISA9Jh7o6OjpWQShoaESHSKnp6jNSgDe3t5UVVbS0tKVlZYeLTHJyclsbW7dVAtsMxlPKxwtIx90dXWsRhBZLhqAORcAFiO4Sg+mRBKcQRN6NxcjOkBIKhvVWSFgMBtKOjegTShyQzKxUyidVTxTRT7FVh4YKC50Tz9oMxeWUC1dRzoAAhN3Sz2mVTfAVyyJUj1eSj+ATzg8QkK9RQByyf4HAAASEUlEQVR4nO2cB3viSLaGhTIKFlFkRA7iEizAxmBst+27aWb77mzs/f9/5J5TJSEBso176LHneerdnQZLQvBxqk6oAMcxGAwGg8FgMBgMBoPBYDAYDAaDwWAwGAwGg8FgMBgMBoPBYDAYDAaDwWAwGAwGg8FgMBiM3z2ueBKO/NEf9PuwxOfcafR+lwrl1kY4CU24an30h/0OXHF7mj5BGPwOLWiJVwP87IviWzQFoclZH/IhJf0Q2z9jH505uEQWNyYxzvJWeZ1baMcN8WP0TVKHVOnHV1dHZ3asVLjAdW5AHEg03+xd4r0g3HyMQD6ZOCRZwxNquX90ZseYx+a5AG0P0PgG12/1LuypG+c3kHMM7yWMfRIzHU9Imf7hmfASj5fFJdhu8HyL/4rQu1qui33Mcl2iVt49yvAoNgVt7X6IQDV7REklZ0rHZ3aUXecOmmejq1yDwKYCQtbrddfirOv1+gqEyr31ugPKrKv1+kK2FFPQ3jTzj1KoSuR/kX+CM7uDh1dITg9apnDvyK0rk/QuuQt//6/MOeBNfrq0OLEoCH/4mZOvF4L5R9cSNUEQLfWIj5H8JpC8YHRYQvLlLuFJzuHcKwgWGZkTwbB/ulStFnwBf3Y5+XEgDP4iyz0N23HpABX8cc1++/3OQvQ7Pf6m975yGX2i1uxhzxNz8HTpcs4DWC6rWmi5f4DlLsByf3WJ/sU31f2qCcVf8sfOqu/NJvxvI7HsUwJ9pfKLgEKnByKEmy7xGSJGCogSqPmfYDnOtxy0XLAcabFPX1T8Gm5qw1iHbHgT/cc3VXs+LhDGEAT1of/HEWOPp8mLubmlsf0W/L8J3gTjwJ8ilnsmliMGfrpU8WwO/HU8xpD/4QrDbxcE1qYvxr8pb+UwdTEXAx9M1K5lq9Xw+xxY7htY7kETFl9Uovv/LlUXzj7wY7yDVw/xPD/UevaPVqjnk5RRRuXsYfIl8rUr86hMaFiW3IWg/zfwOWuIil+swHKcAi32jz8TX7ouoZq+xUews23PILnFD++Huv+WNfwqa/xL6Og1zOI2SjEHluuZgvnN4lyw3CC0HIdpwF9KcmcgmL1MGpsAF7WVKtn8HA8n8rUfrfBEHDDNwhKdKJDByB1NML/QnPOnL77lLiGegIUzMrGrXkVb1fXDO+okJUx/lpiICpqitQccdp/3LQeZC7ZYuQf2BoFL6JE0SiSPLUWVz85qQjum9ok7c1wlKRAiisrRDUkCg5aDrvgfcKZdEPhv6JJf4eqsime3v8xQYOrIgpAOjzB9L53RhFI7lY+wiuib7505IDUnCu6h7rFkmebS9BHD4R+gSTrgVf/eInkNCYM5Eh0xvcnRsqUa402kDJ5pn9HP2PsRqR9+efwrJRK6COkWOtWDw1ndx8dHUCZfPD7iSIQCceBfGAaxadIE5umbGkRHOKstSRg0stLxx1Gl6XnbqFqaJvZqn/BN+ZcKJHplkoecWoPEBXIvbXCJCjTt5mdwJmDYf4GwtUkzUj+vcWnipoBd1zx6S4OP+0AkCk9jT30n3zJRsmHrVzOvUsa2J1z4bQ+dCsZ3tNyAJDCYkT7B7bDF/hNabBec6d9duQUxpMOTxhKnQrXneOqcfhQKoAjRG0uvoqICs0szM+xzFlrO4bBoWkCfw/j+U2g5ohtqiQ6cvSiTlOVYoKqWM23wo/3sZwgU6C6aEBnQcqigBwqCPrezHKTcoPuvECUe4ev4YuHZhl1FgaODjgbqspVKJQMC05PfqnB6DbRc0bVI24M+11pHigYQ5hSpr8EyH/OaNUZHC9tzsZYiUYK3fbDfQ9mSqSBZ6J/pc7rREOnFrGzXmCKHLKtB63e03L/loNwDw2rEchgl/lbisL4VIK/BlLvxhUSJOxolRpO2T6YmlbIVHxRoxEWQX68vk37JZQa+lfciQ02QNQs5ENh5evoJ0nJ32Xwivub+6ek/0CXdxtPTNxD42Hx6QoGbp6c/X6oOmP2hdlgspXbyKpUyCvwhFrQnL8a8IGsk7t0/xENOLSyx0i1dXkJpbHGX5BH/LHORR3rY6uKjjMMXV/JhDWasMr68b2X+hzVRqVJ/qTJa+e/H766or3SMEhjgwX8Sn2f5j5xFh+Vl/5FmqBzJVC0LGq6aPUoh0hNUmMmWVJVHJ1OJyQF+Peobo/NAeEjCrBmjxLuQu9AjbyvGURsZTzKZEjjSUjZDwsQPEfg+0B+aivw+XCilBr+0Y3qBx0MMRkdK4iD3CeIgxrlm6+J9XEMMKf6yiuvnQ4l4mgwWTOPzpWr2cZUE6dKrdVJQLOFwr/luIErQYumIGckU+VQiNsn5Xn1VWvxEvZZaXr1SJgVllS0OTp3tPBi2yfH1WIHGdOp5dOzpfNUEHd3aT5teCRcRp8Bf//d/3k0TeQ7e9GXmZ4sSfD+NGNHi2m4b6TdJ8tlUihTEaO4VMq8iQXbSnuygEY7EAeTbcZQ4ZHI2Jyr5tU90jEAtvV4n0WJJn59gZx+S++y+m37/OErsk/52vigRUyUdFFAvFEt66nSB76VwzjGZ7+WF2YWz4J0vUYubmjuesoubWYqZ7j4b9bM5UdWfnNs7GJ20OzoSwPEvT1r8SvqT8dkKeik5RoaRJqHPxjsKJN7a1fERIylSWJwZj5+eqw+qJRqRokPMUcvQYSE9JvGo1/jwD6M+y+eHkdeNR6lVKvnGN5Cuz1KzZEzE6Ce9czVRtUznjqL1szoLqyQaHe3VcRm10rM7eaN5slDoe/mV/2HH+bw3HveT7dFr8ob5emHcr69mRzGjXR+erw/SuaM9p6WHoxJ+9LePhzBsOm6E+qrJ/iyF5qtPiM2m7ek0PwSxRio+5yRWmnvjWQrbzyh/oNDgvdEnGHKSJsm6V+gbRruQ5H1TeSjaa6fn5QI9sHppHjc96c9sPyOdHcabqZHIfIJyUOJrEg7z1Ue1XcCojhPpeT+zS8XS1ficxZiPU7u+blSPO+tnEMiRVTW1+ZgPq7vkzJjVZ5H593a8o/FmdT60W+rIzp9j3JfAT/OROZqpzlfGtXlottQ8NZsNR9CaCdPptFAYjxOrfjkbSk8epQze5zAgYvczmVCPx9X2bJPI87peq1FPVtNxgLdULlfSYPZqeNEoaRwY+nxe9NeiZseldiiwrtdGo2gOdzg4RrO8UnXKRxYCpbhyJlhrQYPnZxhyoqilPQvO9drQi1gwHT/yYLf7EQsaE1vdLcTl0f/Ozjl59ivh+5E+OK5x9rwvhX3whZEHKZPOhn2wvjdr3h7Oqp/GfoCeCo1BpoT0wmg35OK9tCxLT3p8kASk99f92LXfbEXeSaicN67MiQ3TbUx87El6mKU9ySu/ZApV7XvZGbmoUPlUegJUlVT9tm3rdjLtjSDnqmf4GgKBYpyspxPpGU8PxMFnvXQdE+1RCfysvcMfLfjoxaNWqZzNZCqTdrs6X61Ws6mRLgwx4FFmnpEwprs/j5ghqdHY6NdxxAqHq1b+aBUZocpkstnyR+ortaurPAngEMHrEL3h/1AYxBE3Hrc7CWUl/XdcgAxg6nkQJZIj/AJSq3nlIxVK9tECNr/pkVmZEBlbX+RaiPX+RUjMKrjgHnTS98NQM/PZbJQkqRelUAifhc9DIE2rj4azfFulXc0+Gsn7XODkBUnA8Bu3S6RDAmS8txplPp9D54qMBrejPa309jt9AtTSZA49chiuK62/xO4KMGYqv2p/qCd5BxAtSEq944UJqf1LoKF+4jbK+DjUcITJ3q1v12vq/kkpfKLC2eC1td0clCPu7/+zZEcRFdGNHrVcOKI4MtnFJNLdWHJwkRPd0evi3/F3auHpd+w1VLNeMNdpVz0/I7JTSdIf1JJ/UsrU/ScVL6vPhjQoqXYymGVzczd779oSe7lio3G3dp3gsOW4z3eNRnFzIcqc1b3ZuHisd98oLkVcDtVs7Gh+dZ3NlipsOfROV65DbvJ409iuxdMV2vNE0q+2aiN/3alaStMZR6nizx3Xhv5YMD9KrLgxHSKR9GmiTl9ruQvzIrK+QnwsapomwH8D/PSILD4M/GPFnit3zGbLwsVQ8LfW6Mq4KSbkXlSamiWTXaTBnRYPIujL4fXaVjlZoV09FqivEv4n5w2DmJKfJvpUYD+hlgpkUYdU9hLTsr8Qxm1GBYoPprbYXHU6S/jYdy38MLJ8Iwjbr53OVW6hDR7djtloWXIHtHSeG9qNaHU7nU5vPVg89uAJZykNoQWGJsvB4E6Py4agbRznQTAfOsuBdvp2wziBOIBnkNINKjkyyI3D8ljrSBljzFOBEu8lCmW/de8LdK7QBqIsy474bGr3ClriTjPXoivLLbF13+xQgeK9llNaTqt5L5Jl0G5v0ORa8MTiqEBnTe7UkluOuFw8uHAUWoR4NVievN0wRqDdNqZDWnzreTJZDxelyQF9lhhSgZI6TRT4IEHcE4gLQR/8NgSdbKA9O7jybnHtd0dLVHCVKAhUGhq+SlZ8hyKDwC69iAjEDRfL4E6u4nKKINzidkvl9O2UMQKhw80mBtmkAdXqFBxPLZmYQTkOAuuJuY4C7RK2z10CvCcQ7HKzcy2cuBSaXdzdso62Kl9gcX/n56FAvNOeP1EGgvXOpVQxAvl0ogz+A8cbVH0MTRN6Xboy7meg8Ez3yxIKhFY85cIEPyrQEgdaK/wUuHHpGVQWnegnpQLBro2WEv7Kw6FAxTT3t9eLN9qNorzrZyFA4CioTYZEILiYOk/+4ajX1O0JOFOwnU2eoJPJgL5apICJCpQfya7W8ENttNztfeAW/N0iVKAlFzVzm7sKrHQo8Fpr7u/CkC/AQ91seu/Y0YzdK9gflyYCbQ+aoSoZaYwFdhvVpqDnYW+ExpvX0Z6FxM7uRwLdr/t7xt21dne7FWhblK0uwPl9kJOvt6agmTk/hh4IhFce7j53Ow1BgNhzukI7MqJM9l+AoyxIUPokyT4UtQyNEvxlxpYSfV4vJKCdlsDJTvuJVWQIcE/gUrjbE3il3YDAKxRoXW8XAARCKhD8S/f5zhQ24gsC7w6318vKxdetQO92qsCk6u/fJH2wNqPLWBIJMl8N9qxKaYPn+IKRqaQLJRUFenrVMCLDX1GBrav97T3Q0e5v73DDCHy86wbuKjTXji8Qd5qLj4L/4kOBPS1mo5DsKpt3/DIEcTJ0nQSPAlV7nKAjJAaJfKB3VsX+CM0ztcJ8Bptoxobj07C82XMylilEEg1L3GpLZePbQu72Li6KUYFwhbL1fyfgyMkIg1aMEFwlfPKPlxx6UfAuHnU5NARKmQQERWitkNPVk5jB0UxGrXmRbrgXJpSttglbFjTGwYXbGZh0pzzEcxE6pC+Qfnpno92LsQK3wmavjfpLhuEdTo70hwLBW+b93zpIk5QTkrNxGlqjWu7304at+gIhU+uDM4oT6K4F8yrwAnKroeUcTGS29McPIPbvBLZoOMGEJtaC7rNg9gIlFpQh9AW4m/v5ewXWEmm/5dXqRADODY1RCE5j4haiIBetrRLpbFyqZjn32qInYlUElU5RW0AUkLsDYUsCGGQkgUDnoXEB0dGF8O372AOBuCNh0cE7Qc3U2ly791vLxezIPP3nZw4E8piL+WcqRA9m3uQQPsEfsggEcnzYDUHgwAp+VcWxFEis7x9FRbneDLQmaZsuRLDFw7WiiFd3YGDiRcWcNliLSqehFWO9KCTbzp1G7iRewJ1y0J0bPUVZ49MT9R0K5KbGbhMN3zcqEvlZDpLgQG8kuxdQIFn8p0K6489MgkBhEZCDtpczNXOwGJhQQVzQxuTiBns8BnHvgcZBmQOHP1iYWsO3flRgk6RDshO5U7d13dRMuIOwdU51orjYNShaIZPOlsbhbLE+I2J1r0+KIpWb0kV/qucv/rMz6aAedIrajqJsWWLvrglF3GC7VHY5uLjcQkUoNO+hXUJCvnWh3W0WcNF9kNlBylr03SZ4IpFW/p37Bd7p5hkKS5nLwS2aG/EdyZoUzk7ZNUnVIzNcdo0aKhi/8M+F10i7IQsrMuJAvl05HHwIsNzIL4zJ5DL/ZTtzWE5gGms3BrJ3J9nZvcP38p2vPdiXHByJuyp4ujuyd8Hxs/07xdyVwWAwGAwGg8FgMBgMBoPBYDAYDAaDwWAwGAwGg8FgMBgMBoPBYDAYDAaDwWAwGAwGg8H4KP4ffxt+1FrGgLAAAAAASUVORK5CYII=" }} style={styles.image} />
    </View>
    <View style={styles.bottomContainer}>
      <View style={styles.buttonContainer}>
        <Button
          title="LET'S   START"
          style={styles.button}
          onPress={() => navigation.navigate("Login")}
          color="#1e1f21"
        />
      </View>
    </View>
    </View>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 3,
    backgroundColor: '#1e1f21',
    alignItems: 'center',
    justifyContent: 'center',
  },
  h1: {
    color: '#ffffff',
    fontSize: 40,
    marginTop: 20,
    marginVertical: 10,
  },
  h2: {
    color: '#fa5f09',
    fontSize: 18,
    marginTop: 20,
    marginHorizontal :50,
    marginBottom: 100,
    alignItems: 'center',
  },
  topContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  middleContainer: {
    alignItems: 'center',
  },
  bottomContainer: {
    justifyContent: 'flex-end',
    width: '90%',
    margin: 20,
    padding: 10,
  },
  buttonContainer: {
    backgroundColor: '#fa5f09',
    borderRadius: 5,
    padding: 8,
    margin: 8,
  },
  image: {
    width: 400,
    height: 400,
    justifyContent: 'center',
    marginTop: -50
  },
});
