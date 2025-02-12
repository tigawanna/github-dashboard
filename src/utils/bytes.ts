export function formatKilobytes(kilobytes: number): string {
  const KB_TO_MB = 1024; // 1 MB = 1024 KB
  const KB_TO_GB = 1024 * 1024; // 1 GB = 1024 MB = 1024 * 1024 KB

  if (kilobytes < KB_TO_MB) {
    // If less than 1 MB, display in KB
    return `${kilobytes.toFixed(2)} KB`;
  } else if (kilobytes < KB_TO_GB) {
    // If less than 1 GB, display in MB
    const megabytes = kilobytes / KB_TO_MB;
    return `${megabytes.toFixed(2)} MB`;
  } else {
    // If 1 GB or more, display in GB
    const gigabytes = kilobytes / KB_TO_GB;
    return `${gigabytes.toFixed(2)} GB`;
  }
}

