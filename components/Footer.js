function Footer() {
  return (
    <div className="bg-gray-800 font-mono text-gray-100">
      <div className="mx-auto max-w-4xl px-4 py-4 lg:px-0">
        <p className="text-center text-sm">
          Made with ❤️ by{" "}
          <a
            href="https://twitter.com/sjnaik02"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:text-blue-700"
          >
            Shourya Naik
          </a>
          <a
            href="https://github.com/sjnaik02/tilde"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:text-blue-700"
          >
            {" "}
            | View on Github
          </a>
        </p>
      </div>
    </div>
  );
}

export default Footer;
