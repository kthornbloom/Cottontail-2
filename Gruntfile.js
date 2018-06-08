module.exports = function(grunt) {


	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		svgstore: {
			options: {
				prefix: 'icon-', // id prefix
				svg: {
					viewBox : '0 0 100 100',
					xmlns: 'http://www.w3.org/2000/svg'
				},
				cleanup: ['fill', 'style']
			},
			default : {
				files: {
				'images/sprite.svg': ['icons/*.svg'],
				},
			},
		},

		/* COMBINE JS FILES
		=========================================*/
		concat: {
			dist: {
				src: [
					'js/source/*.js',
					'js/source/elements/*.js'
				],
				dest: 'js/compiled/compiled.js'
			}
		},

		/* MINIFY JS FILES
		=========================================*/
		uglify: {
			build: {
				src: 'js/compiled/compiled.js',
				dest: 'js/compiled/compiled.min.js'
			}
		},

		/* CONVERT SASS TO CSS
		=========================================*/
		sass: {
			dist: {
				files: {
					'css/compiled/compiled.css': 'css/source/global.scss'
				}
			}
		},

		/* ADD CSS VENDOR PREFIXES
		=========================================*/
		autoprefixer: {
            dist: {
                src: 'css/compiled/compiled.css'
            }
        },

		/* MINIFY CSS
		=========================================*/
		cssmin: {
			target: {
				files: [{
					expand: true,
					cwd: 'css/compiled',
					src: ['*.css', '!*.min.css'],
					dest: 'css/compiled',
					ext: '.min.css'
				}]
			}
		},

		/* WATCH FILES FOR CHANGES, THEN RUN TASKS
		=========================================*/
		watch: {
			icons: {
				files: ['icons/*.svg'],
				tasks: ['svgstore'],
				options: {
					spawn: false
				},
			},
			scripts: {
				files: ['js/*.js'],
				tasks: ['concat', 'uglify'],
				options: {
					spawn: false
				},
			},
			css: {
				files: ['css/source/elements/*.scss','css/source/*.scss'],
				tasks: ['sass','autoprefixer','cssmin'],
				options: {
				  spawn: false
				}
			},
			js: {
				files: ['js/source/*.js','js/source/elements/*.js'],
				tasks: ['concat','uglify'],
				options: {
				  spawn: false
				}
			},
			html:{
				files: ['./**/*.html'],
				tasks: [],
				options: {
				  spawn: false,
				  livereload: true
				}
			}
		},

		/* SYNCRONIZE BROWSERS & LIVE INJECT CSS / UPDATE FOR JS & HTML
		=========================================*/
		browserSync: {
		    files: ["js/compiled/*.js","css/compiled/*.css", "*.html"],
		    options: {
				watchTask: true,
		        server: './'
			}
		}

	});

	/* TELL GRUNT WHICH PLUGINS WE NEED
	=========================================*/
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-autoprefixer');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-browser-sync');
	grunt.loadNpmTasks('grunt-svgstore');

	grunt.registerTask('default', ['svgstore','concat','uglify','browserSync','watch','sass','autoprefixer','cssmin']);

};
