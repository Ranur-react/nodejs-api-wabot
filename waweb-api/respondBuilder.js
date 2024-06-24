import axios from 'axios';

const respondBuilderText = async (body, state = {}, userId) => {
    let responses = {
        "info": {
            text: "Silakan pilih informasi layanan dengan mengetik angka nomor opsi layanan:\n1. Informasi Login\n2. Informasi Lokasi Absensi\n3. Informasi Nomor Whatsapp Guru",
            nextState: "infoMenu"
        },
        "infoMenu_2": {
            text: "Pengambilan absen wajib paling jauh di depan gerbang sekolah untuk dapat dianggap sebagai masuk dan berada di area sekolah.",
            nextState: "infoMenu"
        },
        "infoMenu_3": {
            text: "Berikut nomor kontak guru yang bertanggung jawab dan memonitor aplikasi Absensi: ",
            nextState: "infoMenu"
        },
        "Tentang Kami": {
            text: "Absekol (Aplikasi Absensi Sekolah) dikembangkan oleh mahasiswa STMIK Jayanusa dengan nomor BP.202007",
            nextState: state.currentState
        },
        default: {
            text: "Perintah tidak dikenali. Silakan coba lagi.",
            nextState: state.currentState
        }
    };

    const key = `${state.currentState ? state.currentState + "_" : ""}${body}`.trim() || body;

    // Dynamic user data fetching
    if (key === 'infoMenu_1') {
        try {
            const userResponse = await axios.get('https://api.example.com/user'); // Replace with your API endpoint
            const { username, useremail, password, RoleName } = userResponse.data;

            responses["infoMenu_1"] = {
                text: `Akun Anda terdaftar pada aplikasi Absekol dengan detail berikut:\nUsername: ${username}\nEmail: ${useremail}\nPassword: ${password}\nRole: ${RoleName}`,
                nextState: "infoMenu"
            };
        } catch (error) {
            console.error("Error fetching user data:", error);
            responses["infoMenu_1"] = {
                text: "Maaf, terjadi kesalahan saat mengambil data pengguna. Silakan coba lagi nanti.",
                nextState: "infoMenu"
            };
        }
    }

    return responses[key] || responses.default;
};

export default respondBuilderText;