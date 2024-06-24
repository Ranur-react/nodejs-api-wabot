const respondBuilderText = async (body, state = {}, receiver) => {
    const responses = {
        "info": {
            text: "Silakan pilih informasi layanan dengan mengetik angka nomor opsi layanan:\n1. Informasi Login\n2. Informasi Lokasi Absensi\n3. Informasi Nomor Whatsapp Guru\n\nKetik 'home' atau 'Home' untuk kembali ke menu utama.",
            nextState: "infoMenu"
        },
        "infoMenu_2": {
            text: "Pengambilan absen wajib paling jauh di depan gerbang sekolah untuk dapat dianggap sebagai masuk dan berada di area sekolah.\n\nKetik 'home' atau 'Home' untuk kembali ke menu utama.",
            nextState: "infoMenu"
        },
        "infoMenu_3": {
            text: "Berikut nomor kontak guru yang bertanggung jawab dan memonitor aplikasi Absensi:\n\nKetik 'home' atau 'Home' untuk kembali ke menu utama.",
            nextState: "infoMenu"
        },
        "Tentang Kami": {
            text: "Absekol (Aplikasi Absensi Sekolah) dikembangkan oleh mahasiswa STMIK Jayanusa dengan nomor BP.202007\n\nKetik 'home' atau 'Home' untuk kembali ke menu utama.",
            nextState: state.currentState
        },
        default: {
            text: "Perintah tidak dikenali. Silakan coba lagi.\n\nKetik 'home' atau 'Home' untuk kembali ke menu utama.",
            nextState: state.currentState
        }
    };

    if (receiver) {
        try {
            const user = await CallDataUser();
            const { username, email, Role: { roleName } } = user;
            responses["infoMenu_1"] = {
                text: `Akun Anda terdaftar pada aplikasi Absekol dengan detail berikut:\nUsername: ${username}\nEmail: ${email}\nRole: ${roleName}\n\nKetik 'home' atau 'Home' untuk kembali ke menu utama.`,
                nextState: "infoMenu"
            };
        } catch (error) {
            console.error("Error fetching user data:", error);
            responses["infoMenu_1"] = {
                text: "Maaf, terjadi kesalahan saat mengambil data pengguna. Silakan coba lagi nanti.\n\nKetik 'home' atau 'Home' untuk kembali ke menu utama.",
                nextState: "infoMenu"
            };
        }
    } else {
        responses["infoMenu_1"] = {
            text: "Maaf, terjadi kesalahan saat mengambil data pengguna. Silakan coba lagi nanti.\n\nKetik 'home' atau 'Home' untuk kembali ke menu utama.",
            nextState: "infoMenu"
        };
    }

    const key = `${state.currentState ? state.currentState + "_" : ""}${body}`.trim() || body;

    return responses[key] || responses.default;
};

const CallDataUser = async () => {
    const requestOptions = {
        method: "GET",
        redirect: "follow"
    };

    try {
        const response = await fetch("https://absekol-api.numpang.my.id/api/users/nowa/6283182415730", requestOptions);
        const result = await response.json();
        return result;
    } catch (error) {
        console.error("Error fetching user data:", error);
        throw error;
    }
};

export default respondBuilderText;
