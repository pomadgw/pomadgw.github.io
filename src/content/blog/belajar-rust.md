---
title: "Mencoba Rust"
pubDate: 2021-05-30T19:00:00+0700
author: Rahadian Yusuf
description: Saya mencoba belajar Rust
tags:
  - programming
  - indonesian
  - rust
---

Di dunia pemrograman dan _software engineering_ sering kali kita
bertemu dengan suatu _framework_ baru atau malah bahasa pemrograman
baru. Iyap, _bahasa pemrograman_, yang dibuat karena seseorang atau suatu organisasi
tidak puas dengan bahasa-bahasa yang sudah ada sekarang ini yang dianggap
masih kurang cukup untuk membantu menyelesaikan masalah
di sisi _software engineering_.

<!-- more -->

Di beberapa bahasa pemrograman ini ada satu yang mulai naik pamor karena
berpotensi menghapus jenis _bug_ yang sering muncul di banyak aplikasi. Bahasa itu bernama **Rust**
(dari nama jenis jamur, bukan karat). Bahasa ini awalnya dikembangkan
oleh Mozilla tapi sekarang sudah dialihkan ke Rust Foundation.
Anggota Rust Foundation (selain Mozilla) termasuk Microsoft, Google, dan Facebook[^1].
Ini jelas-jelas mengindikasikan bahwa Rust mempunyai masa depan cerah dan
menjadikannya salah satu bahasa pemrograman penting.

## Alasan Rust menjadi populer?

Kenapa Rust jadi punya banyak _backing_ dari perusahaan-perusahaan teknologi besar?
Rust memiliki fitur yang cukup unik, yaitu [_ownership_](https://doc.rust-lang.org/book/ch04-01-what-is-ownership.html).
Intinya suatu value hanya dimiliki oleh satu dan _hanya_ satu variabel.
Hal ini memungkinkan Rust untuk mengetahui kapan alokasi memori diperlukan dan
perlu dilepas tanpa secara eksplisit dikode maupun tanpa bantuan GC. Dengan konsep ini,
Rust membuat kita terhindar dari _bug-bug_ terkait alokasi memori seperti _memory leak_
dengan membuatnya menjadi _compile error_ ketimbang _runtime error_.

## Kode dalam Rust?

Untuk menggunakan Rust, kita pertama perlu menginstall _tool_ bernama `rustup`,
yang bisa dicek [di sini](https://www.rust-lang.org/tools/install). Nanti akan
terinstal _tool-tool_ seperti `rustc` (_compiler_-nya) dan `cargo` (semacam npm-nya Rust
bagi kalian orang-orang JavaScript.)

Setelah itu kita bisa mencoba meng-_compile_ file Rust. Kode _hello world_ di bawah kita
simpan di file `main.rs` lalu kita jalankan `rustc main.rs`.

```rs
fn main() {
  println!("Halo dunia");
}
```

Hasilnya bisa kita lihat di bawah:

![Hasil kompilasi](/img/posts/compile-rust.png)

Biasanya, untuk membuat proyek dalam Rust, kita menggunakan tool `cargo`. Untuk membuat
proyek baru, kita cukup jalankan perintah `cargo new nama_project`. Kemudian
kalau mau mencoba menjalankan programnya, kita jalankan perintah `cargo run` di dalam
folder proyeknya.

![Hasil kompilasi dengan menggunakan cargo](/img/posts/halo-using-cargo.png)

## Bagaimana proses belajarnya?

Saya mencoba belajar Rust dengan membuat proyek yang menurutku tergolong gila, yaitu
mencoba membuat emulator, berdasarkan [seri tutorial](https://www.youtube.com/playlist?list=PLrOv9FMX8xJHqMvSGB_9G9nZZ_4IgteYf) di Youtube.
Aslinya, bahasa yang digunakan dalam tutorial tersebut adalah C++, namun saya mencoba
mem-_porting_ kode itu dalam Rust.

Hasil kodenya lumayan berantakan, namun setidaknya saya paham sedikit mengenai Rust.
Konsep _ownership_ ini adalah hal yang paling lama dipahami, dan ternyata cukup sulit
untuk membuat program dengan _circular reference_ (yang muncul di kode asli dari tutorial),
memerlukan banyak _wrapper_ agar bisa meniru kode tersebut.

Saat ini saya mau mencoba membuat ulang emulator tersebut dengan rencana agar bisa kupakai
di web browser juga.

_Bentar, emangnya bisa ya Rust di browser?_

## Rust di _browser_ ?

Rust ini biasanya digunakan untuk membuat program di _native platform_ (salah satu proyek awal
yang ditulis dalam Rust adalah _browser engine_ untuk Mozilla Firefox.) Namun, dengan
adanya standar [WebAssembly](https://webassembly.org/) (Wasm), segala program yang biasanya di-_compile_ ke _native architecture_
(seperti C, C++, dan tentunya Rust) bisa di-_compile_ menjadi _bytecode_ Wasm yang bisa dijalankan
di browser secara cepat. Mungkin suatu hari kubuat post-nya terkait Wasm ini.
Di Rust sendiri sudah ada [_tool_-nya](https://rustwasm.github.io/docs/book/introduction.html).

## Kalau mau coba belajar Rust di mana, ya?

Tim Rust memiliki [buku resmi](https://doc.rust-lang.org/book/title-page.html) yang bisa
digunakan untuk belajar Rust. Silakan bisa dicek di sana.

## Kesimpulan

Rust menjadi salah satu bahasa yang populer saat ini, dengan banyak _backing_-an dari
perusahaan-perusahaan ternama, namun memiliki konsep _ownership_ yang tergolong baru bagi banyak
programmer. Mungkin di masa depan, saat kita mulai paham dengan konsep _ownership_ ini, akan
semakin banyak aplikasi dan _service_ dan bahkan sistem operasi baru yang ditulis dalam Rust.

[^1]: [https://foundation.rust-lang.org/members/](https://foundation.rust-lang.org/members/)
