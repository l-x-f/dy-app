const networkReg = /^(http|\/\/)/;
export const isBase64 = (path) => /^data:image\/(\w+);base64/.test(path);
export function sleep(delay) {
	return new Promise(resolve => setTimeout(resolve, delay))
}
const isDev = ['devtools'].includes(uni.getSystemInfoSync().platform)
// 缓存图片
let cache = {}
export function isNumber(value) {
	return /^-?\d+(\.\d+)?$/.test(value);
}
export function toPx(value, baseSize, isDecimal = false) {
	// 如果是数字
	if (typeof value === 'number') {
		return value
	}
	// 如果是字符串数字
	if (isNumber(value)) {
		return value * 1
	}
	// 如果有单位
	if (typeof value === 'string') {
		const reg = /^-?([0-9]+)?([.]{1}[0-9]+){0,1}(em|rpx|px|%)$/g
		const results = reg.exec(value);
		if (!value || !results) {
			return 0;
		}
		const unit = results[3];
		value = parseFloat(value);
		let res = 0;
		if (unit === 'rpx') {
			res = uni.upx2px(value);
		} else if (unit === 'px') {
			res = value * 1;
		} else if (unit === '%') {
			res = value * toPx(baseSize) / 100;
		} else if (unit === 'em') {
			res = value * toPx(baseSize || 14);
		}
		return isDecimal ? res.toFixed(2) * 1 : Math.round(res);
	}
	return 0
}

// 计算版本
export function compareVersion(v1, v2) {
	v1 = v1.split('.')
	v2 = v2.split('.')
	const len = Math.max(v1.length, v2.length)
	while (v1.length < len) {
		v1.push('0')
	}
	while (v2.length < len) {
		v2.push('0')
	}
	for (let i = 0; i < len; i++) {
		const num1 = parseInt(v1[i], 10)
		const num2 = parseInt(v2[i], 10)

		if (num1 > num2) {
			return 1
		} else if (num1 < num2) {
			return -1
		}
	}
	return 0
}
// #ifdef MP
export const prefix = () => {
	// #ifdef MP-TOUTIAO
	return tt
	// #endif
	// #ifdef MP-WEIXIN
	return wx
	// #endif
	// #ifdef MP-BAIDU
	return swan
	// #endif
	// #ifdef MP-ALIPAY
	return my
	// #endif
	// #ifdef MP-QQ
	return qq
	// #endif
	// #ifdef MP-360
	return qh
	// #endif
}
// #endif

const base64ToArrayBuffer = (data) => {
	// #ifndef MP-WEIXIN || APP-PLUS
	/**
	 * Base64Binary.decode(base64_string);  
	 * Base64Binary.decodeArrayBuffer(base64_string); 
	 */
	const Base64Binary = {
		_keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
		/* will return a  Uint8Array type */
		decodeArrayBuffer(input) {
			const bytes = (input.length / 4) * 3;
			const ab = new ArrayBuffer(bytes);
			this.decode(input, ab);
			return ab;
		},
		removePaddingChars(input) {
			const lkey = this._keyStr.indexOf(input.charAt(input.length - 1));
			if (lkey == 64) {
				return input.substring(0, input.length - 1);
			}
			return input;
		},
		decode(input, arrayBuffer) {
			//get last chars to see if are valid
			input = this.removePaddingChars(input);
			input = this.removePaddingChars(input);

			const bytes = parseInt((input.length / 4) * 3, 10);

			let uarray;
			let chr1, chr2, chr3;
			let enc1, enc2, enc3, enc4;
			let i = 0;
			let j = 0;

			if (arrayBuffer)
				uarray = new Uint8Array(arrayBuffer);
			else
				uarray = new Uint8Array(bytes);

			input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

			for (i = 0; i < bytes; i += 3) {
				//get the 3 octects in 4 ascii chars
				enc1 = this._keyStr.indexOf(input.charAt(j++));
				enc2 = this._keyStr.indexOf(input.charAt(j++));
				enc3 = this._keyStr.indexOf(input.charAt(j++));
				enc4 = this._keyStr.indexOf(input.charAt(j++));

				chr1 = (enc1 << 2) | (enc2 >> 4);
				chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
				chr3 = ((enc3 & 3) << 6) | enc4;

				uarray[i] = chr1;
				if (enc3 != 64) uarray[i + 1] = chr2;
				if (enc4 != 64) uarray[i + 2] = chr3;
			}
			return uarray;
		}
	}
	return Base64Binary.decodeArrayBuffer(data)
	// #endif
	// #ifdef MP-WEIXIN || APP-PLUS
	return uni.base64ToArrayBuffer(data)
	// #endif
}


/**
 * base64转路径
 * @param {Object} base64
 */
export function base64ToPath(base64) {
	const [, format, bodyData] = /data:image\/(\w+);base64,(.*)/.exec(base64) || [];

	return new Promise((resolve, reject) => {
		// #ifdef MP
		const fs = uni.getFileSystemManager()
		//自定义文件名
		if (!format) {
			reject(new Error('ERROR_BASE64SRC_PARSE'))
		}
		const time = new Date().getTime();
		let pre = prefix()
		const filePath = `${pre.env.USER_DATA_PATH}/${time}.${format}`
		//let buffer = base64ToArrayBuffer(bodyData)
		fs.writeFile({
			filePath,
			data: base64.replace(/^data:\S+\/\S+;base64,/, ''),
			encoding: 'base64',
			// data: buffer,
			// encoding: 'binary',
			success() {
				resolve(filePath)
			},
			fail(err) {
				reject(err)
			}
		})
		// #endif

		// #ifdef H5
		// mime类型
		let mimeString = base64.split(',')[0].split(':')[1].split(';')[0];
		//base64 解码
		let byteString = atob(base64.split(',')[1]);
		//创建缓冲数组
		let arrayBuffer = new ArrayBuffer(byteString.length);
		//创建视图
		let intArray = new Uint8Array(arrayBuffer);
		for (let i = 0; i < byteString.length; i++) {
			intArray[i] = byteString.charCodeAt(i);
		}
		resolve(URL.createObjectURL(new Blob([intArray], {
			type: mimeString
		})))
		// #endif

		// #ifdef APP-PLUS
		const bitmap = new plus.nativeObj.Bitmap('bitmap' + Date.now())
		bitmap.loadBase64Data(base64, () => {
			if (!format) {
				reject(new Error('ERROR_BASE64SRC_PARSE'))
			}
			const time = new Date().getTime();
			const filePath = `_doc/uniapp_temp/${time}.${format}`
			bitmap.save(filePath, {},
				() => {
					bitmap.clear()
					resolve(filePath)
				},
				(error) => {
					bitmap.clear()
					reject(error)
				})
		}, (error) => {
			bitmap.clear()
			reject(error)
		})
		// #endif
	})
}

/**
 * 路径转base64
 * @param {Object} string
 */
export function pathToBase64(path) {
	if (/^data:/.test(path)) return path
	return new Promise((resolve, reject) => {
		// #ifdef H5
		const _canvas = () => {
			let image = new Image();
			image.setAttribute("crossOrigin", 'Anonymous');
			image.onload = function() {
				let canvas = document.createElement('canvas');
				// 获取图片原始宽高
				canvas.width = this.naturalWidth;
				canvas.height = this.naturalHeight;
				// 将图片插入画布并开始绘制
				canvas.getContext('2d').drawImage(image, 0, 0);
				let result = canvas.toDataURL('image/png')
				resolve(result);
				canvas.height = canvas.width = 0
			}
			image.src = path
			image.onerror = (error) => {
				reject(error);
			};
		}
		const _fileReader = (blob) => {
			const fileReader = new FileReader();
			fileReader.onload = (e) => {
				resolve(e.target.result);
			};
			fileReader.readAsDataURL(blob);
			fileReader.onerror = (error) => {
				reject(error);
			};
		}
		const isFileReader = typeof FileReader === 'function'
		if (networkReg.test(path) && isFileReader) {
			window.URL = window.URL || window.webkitURL;
			const xhr = new XMLHttpRequest();
			xhr.open("get", path, true);
			xhr.timeout = 2000;
			xhr.responseType = "blob";
			xhr.onload = function() {
				if (this.status == 200) {
					_fileReader(this.response)
				} else {
					_canvas()
				}
			}
			xhr.onreadystatechange = function() {
				if (this.status === 0) {
					reject(new Error('图片跨域'))
				}
			}
			xhr.send();
		} else if (/^blob/.test(path) && isFileReader) {
			_fileReader(path)
		} else {
			_canvas()
		}
		// #endif

		// #ifdef MP
		if (uni.canIUse('getFileSystemManager')) {
			uni.getFileSystemManager().readFile({
				filePath: path,
				encoding: 'base64',
				success: (res) => {
					resolve('data:image/png;base64,' + res.data)
				},
				fail: (error) => {
					reject(error)
				}
			})
		}
		// #endif

		// #ifdef APP-PLUS
		plus.io.resolveLocalFileSystemURL(getLocalFilePath(path), (entry) => {
			entry.file((file) => {
				const fileReader = new plus.io.FileReader()
				fileReader.onload = (data) => {
					resolve(data.target.result)
				}
				fileReader.onerror = (error) => {
					reject(error)
				}
				fileReader.readAsDataURL(file)
			}, reject)
		}, reject)
		// #endif
	})
}



export function getImageInfo(img) {
	return new Promise(async (resolve, reject) => {
		if (cache[img] && cache[img].errMsg) {
			resolve(cache[img])
		} else {
			uni.getImageInfo({
				src: img,
				success: (image) => {
					if (isDev) {
						resolve(image)
					} else {
						cache[img] = image
						resolve(cache[img])
					}
				},
				fail(err) {
					reject({err, path: img})
				}
			})
		}
	})
}

export function downloadFile(url) {
	if (!url) return Promise.reject({
		err: 'no url'
	})
	return new Promise((resolve, reject) => {
		if(cache[url]) {
			return reject()
		} 
		cache[url] = 1
		uni.downloadFile({
			url,
			success(res) {
				resolve(res)
			},
			fail(err) {
				reject(err)
			}
		})
	})
}

// #ifdef APP-PLUS
const getLocalFilePath = (path) => {
	if (path.indexOf('_www') === 0 || path.indexOf('_doc') === 0 || path.indexOf('_documents') === 0 || path
		.indexOf('_downloads') === 0) {
		return path
	}
	if (path.indexOf('file://') === 0) {
		return path
	}
	if (path.indexOf('/storage/emulated/0/') === 0) {
		return path
	}
	if (path.indexOf('/') === 0) {
		const localFilePath = plus.io.convertAbsoluteFileSystem(path)
		if (localFilePath !== path) {
			return localFilePath
		} else {
			path = path.substr(1)
		}
	}
	return '_www/' + path
}
const getFile = (url) => {
	return new Promise((resolve, rejcet) => {
		plus.io.resolveLocalFileSystemURL(url, resolve, (err) => {
			resolve(false)
		})
	})
}
const createFile = ({
	fs,
	url,
	target,
	name
}) => {
	return new Promise((resolve, reject) => {
		plus.io.resolveLocalFileSystemURL(url, res1 => {
			fs.root.getDirectory(target, {
				create: true
			}, fileEntry => {
				const success = () => {
					res1.remove()
					resolve()
				}
				getFile(target+name).then(res => {
					if(res) {
						res.remove((res2) => {
							res1.moveTo(fileEntry, name, success, reject)
						})
					}
					res1.moveTo(fileEntry, name, success, reject)
				})
			})
		}, reject)
	})
}
export function useNvue(target, version, timeout) {
	return new Promise((resolve, reject) => {
		plus.io.requestFileSystem(plus.io.PRIVATE_DOC, async (fs) => {
			try {
				cache['lime-painter'] = 0
				let names = ['uni.webview.1.5.3.js', 'painter.js', 'index.html']
				let urls = ['https://gitee.com/dcloud/uni-app/raw/dev/dist/',
					'https://static-6d65bd90-8508-4d6c-abbc-a4ef5c8e49e7.bspapp.com/lime-painter/'
				]
				const oldVersion = plus.storage.getItem('lime-painter')
				const isFile = await getFile(`${target}${names[1]}`)
				if(isFile && oldVersion && compareVersion(oldVersion, version) >= 0) {
					resolve()
				} else {
					for (var i = 0; i < names.length; i++) {
						const name = names[i]
							const file = await downloadFile(urls[i >= 1 ? 1 : 0] + name)
							await createFile({
								fs,
								url: file.tempFilePath,
								target,
								name: name.includes('uni.webview') ? 'uni.webview.js': name
							})
					}
					plus.storage.setItem('lime-painter', version)
					cache['lime-painter'] = version
					resolve()
				}
			} catch (e) {
				let index = parseInt(timeout / 20)
				while (!cache['lime-painter'] && index) {
					await sleep(20)
					index--
				}
				if (cache['lime-painter']) {
					resolve()
				} else {
					reject(e)
				}
			}
		}, reject)
	})
}
// #endif