// All page copy, in the two languages the app itself ships with.
// Tool names and one-liners mirror the app's Localizable.strings (v1.2).

export const REPO = 'https://github.com/kabdullah27/respite'
export const KOFI = 'https://ko-fi.com/s/b18fe31629'
export const TIP = 'https://ko-fi.com/kabdullah'
export const VERSION = '1.2'

export const copy = {
  en: {
    nav: { tools: 'Tools', safety: 'Safety', faq: 'Questions', download: 'Download' },
    langLabel: 'Language',

    hero: {
      title: 'A Mac cleaner that asks first.',
      lede: 'Respite finds the caches, leftovers and duplicates that pile up on your Mac, tells you what each one is in plain words, and moves only what you approve to the Trash.',
      download: 'Download for Mac',
      price: 'Pay what you want, including nothing.',
      req: 'macOS 13 or later. Apple Silicon and Intel.',
      source: 'Read the source on GitHub',
    },

    demo: {
      title: 'Quick Clean',
      found: (size) => `Found ${size} you can clear`,
      note: 'Everything below is rebuilt automatically when needed. Recently used items aren’t checked automatically.',
      cache: 'App cache',
      logs: 'Old logs',
      cacheWhy: 'Rebuilt automatically by the app.',
      logsWhy: 'Not needed for everyday use.',
      recent: 'Recently used',
      recentWhy: 'Opened in the last 7 days, so it stays unchecked.',
      move: (size) => `Move ${size} to Trash`,
      nothing: 'Select something to clean',
      selected: (n) => `${n} selected`,
      moving: 'Moving to Trash…',
      doneTitle: (size) => `${size} moved to the Trash.`,
      doneBody: 'Each item was written to your history before it moved. Changed your mind? Open the Trash and choose Put Back.',
      again: 'Start over',
      hint: 'This is a working copy of the real screen. Try unchecking something.',
    },

    tools: {
      title: 'Grouped by what you want to do',
      lede: 'Fifteen tools, sorted the same way as the app’s sidebar. The advanced ones stay folded away until you need them.',
      groups: [
        {
          name: 'Free up space',
          items: [
            ['Quick Clean', 'Remove temporary files that are safe to delete.'],
            ['Large Files', 'Find large files you rarely open.'],
            ['Duplicate Files', 'Find files that are saved twice.'],
            ['Similar Photos', 'Find photos that look almost the same.'],
            ['Uninstall Apps', 'Remove apps and everything they leave behind.'],
            ['Browser Data', 'Clear browser cache and history.'],
          ],
        },
        {
          name: 'Check your Mac',
          items: [
            ['Why Is My Mac Slow?', 'Find out what’s slowing it down right now.'],
            ['Heavy Apps', 'See and quit apps that use the most memory.'],
            ['Mac Temperature', 'Check if your Mac is overheating.'],
            ['Battery', 'Check your battery’s health and cycle count.'],
          ],
        },
        {
          name: 'More tools',
          items: [
            ['Developer Cache', 'Xcode, Homebrew, node_modules and friends. AI models are never touched.'],
            ['Login Apps', 'Manage apps that open at login.'],
            ['Delete Permanently', 'Delete private files forever, behind extra confirmation.'],
            ['Keyboard Lock', 'Lock the keyboard while you wipe it. The trackpad keeps working.'],
            ['Power On Lid Open', 'Choose whether your Mac turns on when you open the lid.'],
          ],
        },
      ],
    },

    flow: {
      title: 'What happens when you press Clean',
      steps: [
        ['It looks', 'Caches, logs, leftovers. Protected system folders are on a hard-coded list it never enters.'],
        ['It explains', 'Every item says what it is and why it’s safe to remove. If Respite can’t explain something, it doesn’t offer it.'],
        ['You decide', 'Anything you used in the last week starts unchecked. The first time you run a tool, you get a dry run.'],
        ['It writes it down', 'Each item goes into a history log before anything moves. You can export it from Settings.'],
        ['It moves to the Trash', 'Not deleted. Put Back works like it always does. Only Delete Permanently skips the Trash.'],
      ],
    },

    honest: {
      title: 'What it won’t tell you',
      lede: 'Most cleaners make their numbers look bigger. Respite leaves out any number it can’t back up.',
      items: [
        ['That purgeable space is yours to clean.', 'macOS frees that space on its own. Respite shows it in the storage bar and never counts it as savings.'],
        ['A temperature it can’t read.', 'Where the sensor answers, you see the reading. Where it doesn’t, you see nothing, not a guess.'],
        ['That your Mac is in danger.', 'No red alerts, no pop-ups, no reminders to clean. If everything is fine, Home says so.'],
      ],
    },

    screens: {
      title: 'The app',
      tabs: ['Home', 'Uninstall Apps', 'Heavy Apps', 'Why Is My Mac Slow?', 'Keyboard Lock'],
      alts: [
        'Respite home screen: status line, storage bar, and the Clean Up My Mac button',
        'Uninstall Apps screen listing installed apps and their leftovers',
        'Heavy Apps screen showing memory use and the heaviest apps, each with a Quit button',
        'Why Is My Mac Slow? screen with a health score and what was checked',
        'Keyboard Lock screen with the unlock timer',
      ],
    },

    quote: {
      text: 'Every cleaner I tried either tried to scare me or hid everything behind one big button. I wanted one that explains itself and lets me undo.',
      who: 'Khalid',
      role: 'makes Respite',
    },

    faq: {
      title: 'Questions',
      items: [
        ['Is paying $0 really fine?', 'Yes. Respite is GPL-3.0, so you can pay any amount, including nothing. The Ko-fi download and a build from source are the same app. Paying is just support.'],
        ['Why isn’t it on the Mac App Store?', 'App Store apps must be sandboxed, and a sandboxed app can’t look inside ~/Library, read browser caches, manage login apps or quit processes. Most cleaners are sold outside the store for the same reason.'],
        ['Does it send anything over the internet?', 'No. There’s no tracking, no account and nothing running in the background. The only network request happens when you press Check for Updates.'],
        ['Why does it ask for Full Disk Access?', 'Without it, macOS hides most of the folders where caches and leftovers live. Respite still runs without it and tells you in the sidebar which areas it skipped.'],
        ['Is Keyboard Lock safe? How do I get out?', 'It’s a window on top of everything, not a hardware switch, so quitting Respite ends it. To unlock, hold the on-screen button for a second, press ⌘⌥L, or wait for the timer (2 minutes by default).'],
        ['Is it in Indonesian?', 'Yes. English and Bahasa Indonesia are both complete. Switch in Settings.'],
      ],
    },

    download: {
      title: 'Get Respite',
      lede: 'Free if you want it to be. One universal DMG: drag it to Applications and open it.',
      button: 'Download on Ko-fi',
      tip: 'Leave a tip instead',
      gateTitle: 'The first time you open it',
      gateBody: 'Respite isn’t notarized by Apple yet, so macOS shows a warning on first launch. Any one of these gets you past it:',
      gate: [
        'Right-click Respite in Applications and choose Open.',
        'Or go to System Settings, Privacy & Security, and click Open Anyway.',
        'Or run this in Terminal:',
      ],
      copy: 'Copy',
      copied: 'Copied',
      specs: [
        ['Needs', 'macOS 13 Ventura or later'],
        ['Runs on', 'Apple Silicon and Intel'],
        ['Languages', 'English, Bahasa Indonesia'],
        ['Network', 'Only when you check for updates'],
        ['Tests', '135 core tests, passing'],
        ['License', 'GPL-3.0'],
      ],
    },

    footer: {
      line: 'Respite is open source under GPL-3.0.',
      github: 'GitHub',
      kofi: 'Ko-fi',
    },
  },

  id: {
    nav: { tools: 'Fitur', safety: 'Keamanan', faq: 'Tanya jawab', download: 'Unduh' },
    langLabel: 'Bahasa',

    hero: {
      title: 'Pembersih Mac yang bertanya dulu.',
      lede: 'Respite mencari cache, sisa aplikasi, dan file ganda yang menumpuk di Mac kamu, menjelaskan masing-masing dengan bahasa sederhana, lalu hanya memindahkan yang kamu setujui ke Trash.',
      download: 'Unduh untuk Mac',
      price: 'Bayar seikhlasnya, boleh juga gratis.',
      req: 'macOS 13 ke atas. Apple Silicon dan Intel.',
      source: 'Lihat kode sumbernya di GitHub',
    },

    demo: {
      title: 'Bersihkan Cepat',
      found: (size) => `Ada ${size} yang bisa dibersihkan`,
      note: 'Semua di bawah ini dibuat ulang otomatis saat dibutuhkan. Yang baru dipakai tidak dicentang otomatis.',
      cache: 'Cache aplikasi',
      logs: 'Catatan lama',
      cacheWhy: 'Dibuat ulang otomatis oleh aplikasinya.',
      logsWhy: 'Tidak dibutuhkan untuk pemakaian sehari-hari.',
      recent: 'Baru dipakai',
      recentWhy: 'Dibuka dalam 7 hari terakhir, jadi tidak dicentang.',
      move: (size) => `Pindahkan ${size} ke Trash`,
      nothing: 'Pilih yang mau dibersihkan',
      selected: (n) => `${n} dipilih`,
      moving: 'Memindahkan ke Trash…',
      doneTitle: (size) => `${size} sudah dipindah ke Trash.`,
      doneBody: 'Setiap item dicatat ke riwayat sebelum dipindah. Berubah pikiran? Buka Trash dan pilih Put Back.',
      again: 'Ulangi',
      hint: 'Ini tiruan yang berfungsi dari layar aslinya. Coba hapus salah satu centangnya.',
    },

    tools: {
      title: 'Dikelompokkan menurut tujuanmu',
      lede: 'Lima belas alat, diurutkan sama seperti menu samping aplikasinya. Alat lanjutan dilipat sampai kamu butuh.',
      groups: [
        {
          name: 'Kosongkan ruang',
          items: [
            ['Bersihkan Cepat', 'Buang file sementara yang aman dihapus.'],
            ['File Besar', 'Temukan file besar yang jarang dibuka.'],
            ['File Ganda', 'Temukan file yang tersimpan dua kali.'],
            ['Foto Mirip', 'Temukan foto yang hampir sama.'],
            ['Hapus Aplikasi', 'Hapus aplikasi sampai ke sisa-sisanya.'],
            ['Data Browser', 'Bersihkan cache dan riwayat browser.'],
          ],
        },
        {
          name: 'Cek kondisi Mac',
          items: [
            ['Kenapa Mac Lambat?', 'Cari tahu apa yang bikin lambat sekarang.'],
            ['Aplikasi Berat', 'Lihat dan tutup aplikasi yang paling boros memori.'],
            ['Suhu Mac', 'Cek apakah Mac kepanasan.'],
            ['Baterai', 'Cek kesehatan baterai dan jumlah siklusnya.'],
          ],
        },
        {
          name: 'Alat lain',
          items: [
            ['Cache Developer', 'Xcode, Homebrew, node_modules, dan sejenisnya. Model AI tidak pernah disentuh.'],
            ['Aplikasi Saat Login', 'Atur aplikasi yang jalan saat login.'],
            ['Hapus Permanen', 'Hapus file rahasia selamanya, dengan konfirmasi berlapis.'],
            ['Kunci Keyboard', 'Kunci keyboard saat dilap. Trackpad tetap jalan.'],
            ['Nyala Saat Dibuka', 'Atur apakah Mac langsung menyala saat layarnya dibuka.'],
          ],
        },
      ],
    },

    flow: {
      title: 'Yang terjadi saat kamu menekan Bersihkan',
      steps: [
        ['Mencari', 'Cache, catatan lama, sisa aplikasi. Folder sistem yang dilindungi ada di daftar tetap yang tidak pernah dimasuki.'],
        ['Menjelaskan', 'Setiap item bilang apa isinya dan kenapa aman dihapus. Kalau Respite tidak bisa menjelaskan, item itu tidak ditawarkan.'],
        ['Kamu memilih', 'Yang kamu pakai seminggu terakhir mulai tanpa centang. Pertama kali menjalankan alat, kamu dapat simulasi dulu.'],
        ['Mencatat', 'Setiap item masuk ke riwayat sebelum ada yang dipindah. Bisa diekspor dari Pengaturan.'],
        ['Memindah ke Trash', 'Bukan dihapus. Put Back tetap bisa. Hanya Hapus Permanen yang melewati Trash.'],
      ],
    },

    honest: {
      title: 'Yang tidak akan dikatakannya',
      lede: 'Kebanyakan pembersih membesar-besarkan angkanya. Respite tidak menampilkan angka yang tidak bisa dipertanggungjawabkan.',
      items: [
        ['Bahwa ruang purgeable bisa kamu bersihkan.', 'macOS mengosongkannya sendiri. Respite menampilkannya di bar penyimpanan dan tidak pernah menghitungnya sebagai hasil.'],
        ['Suhu yang tidak bisa dibaca.', 'Kalau sensornya bisa dibaca, angkanya muncul. Kalau tidak, tidak ada angka, bukan tebakan.'],
        ['Bahwa Mac kamu dalam bahaya.', 'Tidak ada peringatan merah, pop-up, atau ajakan bersih-bersih. Kalau semuanya baik, Beranda bilang begitu.'],
      ],
    },

    screens: {
      title: 'Aplikasinya',
      tabs: ['Beranda', 'Hapus Aplikasi', 'Aplikasi Berat', 'Kenapa Mac Lambat?', 'Kunci Keyboard'],
      alts: [
        'Beranda Respite: status, bar penyimpanan, dan tombol Bersihkan Mac Sekarang',
        'Layar Hapus Aplikasi berisi daftar aplikasi dan sisa filenya',
        'Layar Aplikasi Berat yang menampilkan pemakaian memori dan aplikasi terberat, masing-masing dengan tombol Quit',
        'Layar Kenapa Mac Lambat? dengan skor kesehatan dan hal-hal yang dicek',
        'Layar Kunci Keyboard dengan pengatur waktu buka kunci',
      ],
    },

    quote: {
      text: 'Semua pembersih yang saya coba kalau tidak menakut-nakuti, ya menyembunyikan semuanya di balik satu tombol besar. Saya ingin yang menjelaskan dirinya dan bisa dibatalkan.',
      who: 'Khalid',
      role: 'pembuat Respite',
    },

    faq: {
      title: 'Tanya jawab',
      items: [
        ['Beneran boleh bayar $0?', 'Boleh. Respite berlisensi GPL-3.0, jadi kamu bebas bayar berapa saja, termasuk nol. Unduhan dari Ko-fi dan hasil build dari kode sumber adalah aplikasi yang sama. Membayar itu murni dukungan.'],
        ['Kenapa tidak ada di Mac App Store?', 'Aplikasi App Store wajib di-sandbox, dan aplikasi yang di-sandbox tidak bisa melihat isi ~/Library, membaca cache browser, mengatur aplikasi saat login, atau menutup proses. Kebanyakan pembersih dijual di luar store karena alasan yang sama.'],
        ['Apakah ada data yang dikirim lewat internet?', 'Tidak. Tidak ada pelacakan, tidak perlu akun, dan tidak ada yang berjalan diam-diam. Satu-satunya koneksi terjadi saat kamu menekan Periksa Pembaruan.'],
        ['Kenapa minta Full Disk Access?', 'Tanpa izin itu, macOS menyembunyikan sebagian besar folder tempat cache dan sisa aplikasi berada. Respite tetap jalan tanpanya dan memberi tahu di menu samping bagian mana yang dilewati.'],
        ['Kunci Keyboard aman? Cara keluarnya?', 'Ini jendela di atas semua jendela, bukan saklar hardware, jadi menutup Respite langsung mengakhirinya. Untuk membuka: tahan tombol di layar selama sedetik, tekan ⌘⌥L, atau tunggu timernya (default 2 menit).'],
        ['Ada bahasa Indonesianya?', 'Ada. Bahasa Inggris dan Indonesia sama-sama lengkap. Ganti di Pengaturan.'],
      ],
    },

    download: {
      title: 'Dapatkan Respite',
      lede: 'Gratis kalau kamu mau. Satu DMG universal: seret ke Applications lalu buka.',
      button: 'Unduh di Ko-fi',
      tip: 'Atau kirim tip saja',
      gateTitle: 'Saat pertama kali dibuka',
      gateBody: 'Respite belum dinotarisasi Apple, jadi macOS memberi peringatan saat pertama dibuka. Pakai salah satu cara ini:',
      gate: [
        'Klik kanan Respite di Applications, lalu pilih Open.',
        'Atau buka System Settings, Privacy & Security, lalu klik Open Anyway.',
        'Atau jalankan ini di Terminal:',
      ],
      copy: 'Salin',
      copied: 'Tersalin',
      specs: [
        ['Butuh', 'macOS 13 Ventura ke atas'],
        ['Jalan di', 'Apple Silicon dan Intel'],
        ['Bahasa', 'Inggris, Indonesia'],
        ['Jaringan', 'Hanya saat cek pembaruan'],
        ['Tes', '135 tes inti, lulus semua'],
        ['Lisensi', 'GPL-3.0'],
      ],
    },

    footer: {
      line: 'Respite adalah open source dengan lisensi GPL-3.0.',
      github: 'GitHub',
      kofi: 'Ko-fi',
    },
  },
}
