export function extractOutdatedFiles(files) {
	return files
		.filter(
			singleEntry =>
				singleEntry.type === 'file' &&
				singleEntry.filename.split('.').pop() === 'mp4'
		)
		.sort((a, b) => Number(b.lastModified) - Number(a.lastModified))
		.splice(4)
}
