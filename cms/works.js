// Give editors a useful message before an incomplete video reaches Astro's build.
CMS.registerEventListener({
  name: 'preSave',
  handler: ({ entry }) => {
    if (entry.get('collection') !== 'portfolio') return;
    const works = entry.getIn(['data', 'works']);
    works?.forEach(work => {
      if (work.get('type') === 'video' && !work.get('videoUrl')?.trim()) {
        throw new Error(`视频作品「${work.get('title') || '未命名'}」需要上传视频文件或填写视频 URL。`);
      }
      const video = work.get('videoUrl');
      if (work.get('type') === 'video' && video && !/\.(mp4|webm)(?:[?#].*)?$/i.test(video)) {
        throw new Error('请使用 MP4 或 WebM 视频文件的直接地址，不要填写视频网页地址。');
      }
    });
    return entry.get('data');
  },
});
