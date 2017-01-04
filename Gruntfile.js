module.exports = function(grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		/* COMBINE JS FILES
		=========================================*/
		concat: {
			dist: {
				src: [
					'Cottontail-2/js/src/*.js'
				],
				dest: 'Cottontail-2/js/build/production.js'
			}
		},

		/* MINIFY JS FILES
		=========================================*/
		uglify: {
			build: {
				src: 'Cottontail-2/js/build/production.js',
				dest: 'Cottontail-2/js/build/production.min.js'
			}
		},

		/* CONVERT SASS TO CSS
		=========================================*/
		sass: {
			dist: {
				files: {
					'Cottontail-2/css/build/stylesheet.css': 'Cottontail-2/css/src/~global.scss'
				}
			}
		},

		/* ADD CSS VENDOR PREFIXES
		=========================================*/
		autoprefixer: {
            dist: {
                src: 'Cottontail-2/css/build/stylesheet.css'
            }
        },

		/* MINIFY CSS
		=========================================*/
		cssmin: {
			target: {
				files: [{
					expand: true,
					cwd: 'Cottontail-2/css/build',
					src: ['*.css', '!*.min.css'],
					dest: 'Cottontail-2/css/build',
					ext: '.min.css'
				}]
			}
		},

		/* WATCH FILES FOR CHANGES, THEN RUN TASKS
		=========================================*/
		watch: {
			scripts: {
				files: ['Cottontail-2/js/*.js'],
				tasks: ['concat', 'uglify'],
				options: {
					spawn: false
				},
			},
			css: {
				files: ['Cottontail-2/css/src/*.scss'],
				tasks: ['sass','autoprefixer','cssmin'],
				options: {
				  spawn: false
				}
			},
			js: {
				files: ['Cottontail-2/js/src/*.js'],
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
		    files: ["css/build/*.css", "js/build/*.js", "*.html"],
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

	grunt.registerTask('default', ['concat','uglify','browserSync','watch','sass','autoprefixer','cssmin']);

};
